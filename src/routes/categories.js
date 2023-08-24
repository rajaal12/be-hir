const express = require('express')
const router = express.Router()
const categoriesController = require('../controller/categories')

router
  .get('/', categoriesController.getAllCategory)
  .get('/:category_id', categoriesController.getDetailCategory)
  .post('/', categoriesController.createCategory)
  .put('/:category_id', categoriesController.updateCategory)
  .delete('/:category_id', categoriesController.deleteCategory)

module.exports = router
