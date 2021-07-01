const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Mongo database connected successfully')
  } catch (err) {
    console.log('Mongo database connection failure')
    process.exit(1)
  }
}

module.exports = { connectMongo }
