const express = require('express')
const router = express.Router()
const productRouter = require('../routes/products')
const categoryRouter = require('../routes/categories')
const ordersRouter = require('../routes/orders')
const userRouter = require('../routes/users')
const skillsRouter = require('../routes/skills')
const experienceRouter = require('../routes/experience')
const portofolioRouter = require('../routes/portofolio')
const userRecruiterRouter = require('../routes/userRecruiter')
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/orders', ordersRouter)
router.use('/users', userRouter)
router.use('/skills', skillsRouter)
router.use('/experience',experienceRouter)
router.use('/portofolio',portofolioRouter)
router.use('/recruiter',userRecruiterRouter)
module.exports = router