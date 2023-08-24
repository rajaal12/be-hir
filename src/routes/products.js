const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const upload = require('../middleware/upload')
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')
const { protect, validateSeller } = require('../middleware/auth')

router
  .get('/',  productController.getAllProduct)
  .get('/:product_id', productController.getDetailProduct)
  .post('/', upload.single('image'), productController.createProduct)
  .put('/:product_id',upload.single('image'), productController.updateProduct)
  .delete('/:product_id',productController.deleteProduct)

module.exports = router
