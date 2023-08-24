const pool = require('../config/db')

const selectAllProduct = (limit, offset, sortby, sort) => {
  return pool.query(
    // `SELECT products.product_id, products.product_name, products.brand, products.price, products.color, products.size, products.stock, products.image, products.rating, categories.category
    // FROM Products
    // JOIN Categories ON products.category_id = categories.category_id
    // ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}
    // `
    `SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const searchProduct = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM products WHERE product_name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const selectProduct = (id) => {
  return pool.query(`SELECT * FROM products WHERE product_id = ${id}`)
}

const insertProduct = (data) => {
  const {
    product_id,
    product_name,
    brand,
    price,
    color,
    size,
    stock,
    image,
    rating,
    category_id
  } = data
  return pool.query(
    `INSERT INTO products (product_id,product_name,brand,price,color,size,stock,image,rating,category_id) VALUES (${product_id},'${product_name}','${brand}',${price},'${color}',${size},${stock},'${image}',${rating},${category_id}) `
  )
}

const updateProduct = (data) => {
  const {
    product_id,
    product_name,
    brand,
    price,
    color,
    size,
    stock,
    image,
    rating,
    category_id
  } = data
  return pool.query(
    `UPDATE products SET product_name = '${product_name}', brand = '${brand}', price = ${price}, color = '${color}', size = ${size}, stock = ${stock}, image = '${image}', rating = ${rating}, category_id = ${category_id} WHERE product_id = ${product_id}`
  )
}

const deleteProduct = (id) => {
  return pool.query(`DELETE FROM products WHERE product_id = ${id}`)
}

const countData = () => {
  return pool.query('SELECT COUNT(*) FROM products')
}

const findId = (product_id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT product_id FROM products WHERE Product_id=${product_id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
  selectAllProduct,
  selectProduct,
  searchProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId
}
