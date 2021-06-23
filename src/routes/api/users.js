const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../heplers/apiHelpers')

const {
  signUpController,
  loginController,
  logoutController,
  getCurrentController
} = require('../../controllers/usersController')

router.post('/signup', asyncWrapper(signUpController))

router.post('/login', asyncWrapper(loginController))

router.post('/logout', asyncWrapper(logoutController))

router.get('/current', asyncWrapper(getCurrentController))

module.exports = router
