const {
  signUp,
  login,
  logout,
  getCurrent,
  updateAvatar,
  saveUserAvatar,
  resendVerificationToken
} = require('../services/usersService')

//
const { HttpCode } = require('../helpers/constants')
const { NotAuthorizedError } = require('../helpers/errors')

const { User } = require('../model/userModel')

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

// email

const updateVerifyToken = async (userId, verify, verifyToken) =>
  await User.findByIdAndUpdate(userId, { verify, verifyToken }, { new: true })

const verificationUserTokenController = async (req, res) => {
  const verifyToken = req.params.verificationToken
  const verifiedUser = await User.findOne({ verifyToken })
  await updateVerifyToken(verifiedUser._id, true, null)
  res.status(HttpCode.OK).json({ message: 'Verification successful' })
}

const resendVerificationTokenController = async (req, res) => {
  const { email } = req.body
  await resendVerificationToken(email)
  res.status(HttpCode.OK).json({
    message: 'Verification email sent'
  })
}

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentController,
  updateUserAvatarController,
  verificationUserTokenController,
  resendVerificationTokenController
}
