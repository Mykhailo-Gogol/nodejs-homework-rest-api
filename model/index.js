const fs = require('fs').promises
const path = require('path')

const contactsList = path.resolve('model/contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsList, 'utf8')
  const parsedContacts = JSON.parse(contacts, null, 2)
  return parsedContacts
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsList, 'utf8')
  const parsedContacts = JSON.parse(contacts, null, 2)
  return parsedContacts.find((el) => el.id === Number(contactId))
}

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsList, 'utf8')
  const parsedContacts = JSON.parse(contacts, null, 2)
  const filteredContacts = parsedContacts.filter(
    (el) => el.id !== Number(contactId)
  )
  await fs.writeFile(contactsList, JSON.stringify(filteredContacts), 'utf8')

  return filteredContacts
}

// const addContact = async (body) => {
//   const contacts = await fs.readFile(contactsList, 'utf8')
//   const parsedContacts = JSON.parse(contacts, null, 2)
//   const { id, name, email, phone } = body
//   const newContactList = [...parsedContacts, { id, name, email, phone }]

//   await fs.writeFile(contactsList, JSON.stringify(newContactList), 'utf8')

//   return newContactList
// }

// const updateContact = async (contactId, body) => {
//   const contactById = await getContactById(contactId)
//   return body ? { ...contactById, ...body } : contactById
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact
  // addContact,
  // updateContact
}
