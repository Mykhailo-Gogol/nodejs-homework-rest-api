const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const {
  signUpController,
  loginController,
  logoutController,
  getCurrentController
} = require('../../controllers/usersController')

router.post('/signup', asyncWrapper(signUpController))

router.post('/login', asyncWrapper(loginController))

router.post('/logout', authMiddleware, asyncWrapper(logoutController))

router.get('/current', authMiddleware, asyncWrapper(getCurrentController))

module.exports = router
