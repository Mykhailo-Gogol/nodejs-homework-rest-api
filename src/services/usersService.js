const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

module.exports = {
  signUp,
  login,
  logout,
  getCurrent
}
