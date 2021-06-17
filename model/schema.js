const schema = {
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  }
}

module.exports = { schema }