const pool = require('../config/db')

const selectAllCategory = (limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM categories ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const searchCategory = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM categories WHERE category ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const selectCategory = (id) => {
  return pool.query(`SELECT * FROM categories WHERE category_id = ${id}`)
}

const insertCategory = (data) => {
  const { category } = data
  return pool.query(
    `INSERT INTO categories (category) VALUES ('${category}') `
  )
}

const updateCategory = (data) => {
  const { category_id, category } = data
  return pool.query(
    `UPDATE categories SET category = '${category}' WHERE category_id = ${category_id}`
  )
}

const deleteCategory = (id) => {
  return pool.query(`DELETE FROM categories WHERE category_id = ${id}`)
}

const countData = () => {
  return pool.query('SELECT COUNT(*) FROM categories')
}

const findId = (id) => {
  return pool.query(
    `SELECT COUNT(*) FROM categories WHERE category_id = ${id}`
  )
}

module.exports = {
  selectAllCategory,
  searchCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId
}
