const mongoose = require('mongoose')

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_CONNECT_URL, {
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
