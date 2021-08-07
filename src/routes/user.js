const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.post('/logout', authMiddleware, userController.logout)


module.exports = router