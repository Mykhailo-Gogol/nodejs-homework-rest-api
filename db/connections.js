const MongoClient = require('mongodb').MongoClient

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db()

  const ContactsCollection = db.collection('contacts')

  console.log('Mongo database connected successfully')
  return { ContactsCollection }
}

module.exports = { connectMongo }
