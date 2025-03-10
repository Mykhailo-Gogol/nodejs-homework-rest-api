const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const userSchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  verify: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required']
  }
})

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = mongoose.model('User', userSchema)

const start = async () => {
  await User.createCollection()
}

start()

module.exports = { User }
