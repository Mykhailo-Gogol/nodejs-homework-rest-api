const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { uuid } = require('uuidv4')

const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')

const finalAvatarsFolder = path.join(
  process.cwd(),
  'public',
  process.env.AVATARS_FOLDER
)

const { User } = require('../model/userModel')
const { NotAuthorizedError } = require('../helpers/errors')
const JWT_SECRET = process.env.JWT_SECRET

const signUp = async (email, password) => {
  const user = new User({
    email,
    password
  })
  await user.save()
}

const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`)
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong password')
  }
  const token = jwt.sign(
    {
      _id: user._id
    },
    JWT_SECRET
  )
  await User.findByIdAndUpdate(user._id, { token }, { new: true })
  return token
}

const logout = async (id, token) => {
  await User.findByIdAndUpdate(id, { token: null }, { new: true })
}

const getCurrent = async (id) => {
  const user = await User.findById(id)
  return user
}

const updateAvatar = async (userId, file, avatar, cb) => {
  const avatarURL = await cb(file, avatar)
  await User.findByIdAndUpdate(userId, { avatarURL }, { new: true })
  return avatarURL
}

const saveUserAvatar = async (file, avatar) => {
  const pathName = file.path
  const newAvatar = `${uuid()}-${file.originalname}`
  const img = await Jimp.read(pathName)
  await img.autocrop().cover(250, 250).writeAsync(pathName)
  try {
    await fs.rename(pathName, path.join(`${finalAvatarsFolder}`, newAvatar))
  } catch (error) {
    await fs.unlink(pathName)
    throw error
  }
  // if (avatar.includes(`${process.env.AVATARS_FOLDER}/`)) {
  //   await fs.unlink(path.join(process.cwd(), 'public', avatar))
  // }
  return path.join(process.env.AVATARS_FOLDER, newAvatar).replace('\\', '/')
}

module.exports = {
  signUp,
  login,
  logout,
  getCurrent,
  updateAvatar,
  saveUserAvatar
}
