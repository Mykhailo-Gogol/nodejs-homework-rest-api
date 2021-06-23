const { signUp, login } = require('../services/usersService')
//  logout, getCurrent
const { HttpCode } = require('../heplers/constants')
const { NotAuthorizedError } = require('../heplers/errors')

const signUpController = async (req, res) => {
  const { email, password } = req.body

  await signUp(email, password)

  res.status(HttpCode.CREATED).json({
    code: HttpCode.CREATED,
    status: 'success',
    message: 'created'
  })
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body

  const token = await login(email, password)

  if (token) {
    res.status(HttpCode.OK).json({
      code: HttpCode.OK,
      status: 'success',
      token
    })
  } else {
    next(new NotAuthorizedError('Email or password is wrong'))
  }
}

const logoutController = async (req, res) => {}

const getCurrentController = async (req, res) => {}

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentController
}
