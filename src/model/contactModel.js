const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  }
})

const Contact = mongoose.model('Contact', contactSchema)

const start = async () => {
  await Contact.createCollection()
}

start()

module.exports = { Contact }
