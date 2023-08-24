const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const { protect, validateAdmin } = require('../middleware/auth')

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .get('/:worker_id', userController.getDetailWorker)
  .post('/refreshToken', userController.refreshToken)
  .get('/', userController.getAllUser)
  .put('/:worker_id',userController.updateWorker)

module.exports = router
