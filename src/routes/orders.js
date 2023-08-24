const express = require('express')
const router = express.Router()
const ordersController = require('../controller/orders')

router
  .get('/', ordersController.getAllOrder)
  .get('/:order_id', ordersController.getDetailOrder)
  .post('/', ordersController.createOrder)
  .put('/:order_id', ordersController.updateOrder)
  .delete('/:order_id', ordersController.deleteOrder)

module.exports = router
