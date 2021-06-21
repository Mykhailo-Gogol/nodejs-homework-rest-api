const { HttpCode } = require('../src/heplers/constants')

const app = require('../src/app')
require('dotenv').config()

const { connectMongo } = require('../src/db/connections')
const PORT = process.env.PORT || 3000

app.use((error, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: error.message })
})

const start = async () => {
  await connectMongo()

  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Error at a server launch: ${err}`)
    }
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
