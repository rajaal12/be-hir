const pool = require('../config/db')

const selectAllOrder = (limit, offset, sortby, sort) => {
  return pool.query(
    // `SELECT orders.order_id, orders.order_date, orders.address, orders.price, orders.shipping, orders.total_price, orders.payment_method, products.product_name, orders.customer_id, orders.image
    // FROM Orders
    // JOIN products ON orders.product_id = products.product_id
    // ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}
    // `
    `SELECT orders.order_id, orders.order_date, orders.address, orders.price, orders.shipping, orders.total_price, orders.payment_method, products.product_name, categories.category
    FROM Orders
    JOIN products ON orders.product_id = products.product_id
    JOIN categories ON products.category_id = categories.category_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}
    `
    // `SELECT * FROM orders ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const searchOrder = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM orders WHERE address ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const selectOrder = (id) => {
  return pool.query(`SELECT * FROM orders WHERE order_id = ${id}`)
}

const insertOrder = (data) => {
  const {
    order_id,
    order_date,
    address,
    price,
    shipping,
    total_price,
    payment_method,
    product_id,
    customer_id,
    image
  } = data
  return pool.query(
    `INSERT INTO orders (order_id,order_date,address,price,shipping,total_price,payment_method,product_id,customer_id,image) VALUES (${order_id},'${order_date}','${address}',${price},${shipping},${total_price},'${payment_method}',${product_id},${customer_id},'${image}') `
  )
}

const updateOrder = (data) => {
  const {
    order_id,
    order_date,
    address,
    price,
    shipping,
    total_price,
    payment_method,
    product_id,
    customer_id,
    image
  } = data
  return pool.query(
    `UPDATE orders SET order_date = '${order_date}', address = '${address}', price = ${price}, shipping = ${shipping}, total_price = ${total_price}, payment_method = '${payment_method}', product_id = ${product_id}, customer_id = ${customer_id}, image = '${image}' WHERE order_id = ${order_id}`
  )
}

const deleteOrder = (id) => {
  return pool.query(`DELETE FROM orders WHERE order_id = ${id}`)
}

const countData = () => {
  return pool.query('SELECT COUNT(*) FROM orders')
}

const findId = (id) => {
  return pool.query(`SELECT COUNT(*) FROM orders WHERE order_id = ${id}`)
}

module.exports = {
  selectAllOrder,
  searchOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId
}
