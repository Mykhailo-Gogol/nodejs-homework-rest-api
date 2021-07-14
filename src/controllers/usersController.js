const {
  signUp,
  login,
  logout,
  getCurrent,
  updateAvatar,
  saveUserAvatar
} = require('../services/usersService')
//
const { HttpCode } = require('../helpers/constants')
const { NotAuthorizedError } = require('../helpers/errors')

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

const logoutController = async (req, res) => {
  const { _id } = req.user
  const { token } = req.token

  await logout(_id, token)

  res.status(HttpCode.OK).json({ code: HttpCode.OK, status: 'success' })
}

const getCurrentController = async (req, res) => {
  const { _id } = req.user
  const user = await getCurrent(_id)
  res.status(HttpCode.OK).json({
    code: HttpCode.OK,
    status: 'success',
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const updateUserAvatarController = async (req, res) => {
  const { id } = req.user
  const avatar = req.user.avatarURL
  const avatarURL = await updateAvatar(id, req.file, avatar, saveUserAvatar)
  res.json({ avatarURL })
}

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentController,
  updateUserAvatarController
}
