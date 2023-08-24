const {
  selectAllCategory,
  searchCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId
} = require('../model/categories')

const commonHelper = require('../helper/common')

const categoriesController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'category_id'
      const sort = req.query.sort?.toUpperCase() || 'ASC'
      const search = req.query.search || ''

      if (search) {
        result = await searchCategory(search, limit, offset, sortby, sort)
        count = await countData(search)
      } else {
        result = await selectAllCategory(limit, offset, sortby, sort)
        count = await countData()
      }

      const totalData = parseInt(count.count)
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
        'get data success',
        pagination
      )
    } catch (err) {
      console.log(err)
    }
  },
  getDetailCategory: async (req, res) => {
    try {
      const id = Number(req.params.category_id)
      const result = await selectCategory(id)
      commonHelper.response(res, result.rows, 200, 'get data success')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  createCategory: async (req, res) => {
    try {
      const { category_id, category } = req.body
      const {
        rows: [count]
      } = await countData()
      const id = Number(count.count) + 1
      const data = {
        category_id: id,
        category
      }
      const result = await insertCategory(data)
      commonHelper.response(res, result.rows, 201, 'category created')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  updateCategory: async (req, res) => {
    try {
      const id = Number(req.params.category_id)
      const { category_id, category } = req.body
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const data = {
        category_id: id,
        category
      }
      const result = await updateCategory(data)
      commonHelper.response(res, result.rows, 200, 'Category updated')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = Number(req.params.category_id)
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const result = await deleteCategory(id)
      commonHelper.response(res, result.rows, 200, 'Category deleted')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  }
}

module.exports = categoriesController
