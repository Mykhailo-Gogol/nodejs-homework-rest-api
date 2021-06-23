const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../model/userModel')
const { NotAuthorizedError } = require('../heplers/errors')

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
    process.env.JWT_SECRET
  )

  return token
}

const logout = async (id, res) => {}

const getCurrent = async (id, res) => {}

module.exports = {
  signUp,
  login,
  logout,
  getCurrent
}
