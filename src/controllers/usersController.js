const { signUp } = require('../services/usersService')
// login, logout, getCurrent
const { HttpCode } = require('../heplers/constants')

const signUpController = async (req, res) => {
  const { email, password } = req.body

  await signUp(email, password)

  res.status(HttpCode.OK).json({
    code: HttpCode.OK,
    status: 'success'
  })
}

const loginController = async (req, res) => {}

const logoutController = async (req, res) => {}

const getCurrentController = async (req, res) => {}

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentController
}
