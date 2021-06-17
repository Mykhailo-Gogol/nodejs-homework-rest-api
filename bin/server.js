const app = require('../app')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = process.env.PORT || 3000

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db()

  const ContactsCollection = db.collection('contacts')
  const contacts = await ContactsCollection.find({}).toArray()
  console.log(contacts)

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
