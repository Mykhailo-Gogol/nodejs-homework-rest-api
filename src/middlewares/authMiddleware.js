const jwt = require('jsonwebtoken')
require('dotenv').config()

const { NotAuthorizedError } = require('../helpers/errors')

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    next(new NotAuthorizedError('Please, provide a token'))
  }

  try {
    const user = jwt.decode(token, JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(new NotAuthorizedError('Invalid token'))
  }
}

module.exports = {
  authMiddleware
}

// // TODO: validate token type later
