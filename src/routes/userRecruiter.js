const express = require('express')
const router = express.Router()
const recruiterController = require('../controller/userRecruiter')
const { protect, validateAdmin } = require('../middleware/auth')

router
  .post('/register', recruiterController.registerRecruiter)
  .post('/login', recruiterController.loginUser)
  .get('/:recruiter_id', recruiterController.getDetailRecruiter)
  .post('/refreshToken', recruiterController.refreshToken)
  .get('/', recruiterController.getAllUser)
  .put('/:recruiter_id',recruiterController.updateRecruiter)

module.exports = router