const {
  selectAllProduct,
  searchProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId
} = require('../model/products')

const client = require('../config/redis')

const commonHelper = require('../helper/common')

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'product_name'
      const sort = req.query.sort?.toUpperCase() || 'ASC' // optional chaining
      const search = req.query.search || ''

      if (search) {
        result = await searchProduct(search, limit, offset, sortby, sort)
        count = await countData(search)
      } else {
        result = await selectAllProduct(limit, offset, sortby, sort)
        count = await countData()
      }

      const totalData = parseInt(count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHelper.response(
        res,
        result.rows,
        200,
        'get data success ',
        pagination
      )
    } catch (err) {
      console.log(err)
    }
  },
  getDetailProduct: async (req, res) => {
    try {
      const id = Number(req.params.product_id)
      const result = await selectProduct(id)
      client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
      commonHelper.response(res, result.rows, 200, 'get data success')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  createProduct: async (req, res) => {
    try {
      const PORT = process.env.PORT || 3000
      const DB_HOST = process.env.DB_HOST || 'localhost'
      const image = req.file.filename
      const {
        product_name,
        brand,
        price,
        color,
        size,
        stock,
        rating,
        category_id
      } = req.body
      const {
        rows: [count]
      } = await countData()
      const id = Number(count.count) + 1
      const data = {
        product_id: id,
        product_name,
        brand,
        price,
        color,
        size,
        stock,
        image: `http://${DB_HOST}:${PORT}/img/${image}`,
        rating,
        category_id
      }
      const result = await insertProduct(data)
      commonHelper.response(res, result.rows, 201, 'Product created')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  updateProduct: async (req, res) => {
    try {
      const id = Number(req.params.product_id)
      const PORT = process.env.PORT || 3000
      const DB_HOST = process.env.DB_HOST || 'localhost'
      const image = req.file.filename
      const {
        product_name,
        brand,
        price,
        color,
        size,
        stock,
        rating,
        category_id
      } = req.body
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const data = {
        product_id: id,
        product_name,
        brand,
        price,
        color,
        size,
        stock,
        image: `http://${DB_HOST}:${PORT}/img/${image}`,
        rating,
        category_id
      }
      const result = await updateProduct(data)
      commonHelper.response(res, result.rows, 200, 'Product updated')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.product_id)
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const result = await deleteProduct(id)
      commonHelper.response(res, result.rows, 200, 'Product deleted')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  }
}

module.exports = productController
