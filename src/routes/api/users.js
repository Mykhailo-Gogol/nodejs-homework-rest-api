const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const { uploadAvatar } = require('../../helpers/multer')

const {
  signUpController,
  loginController,
  logoutController,
  getCurrentController,
  updateUserAvatarController
} = require('../../controllers/usersController')

router.post('/signup', asyncWrapper(signUpController))

router.post('/login', asyncWrapper(loginController))

router.post('/logout', authMiddleware, asyncWrapper(logoutController))

router.get('/current', authMiddleware, asyncWrapper(getCurrentController))

router.patch(
  '/avatars',
  authMiddleware,
  uploadAvatar.single('avatar'),
  asyncWrapper(updateUserAvatarController)
)

module.exports = router
