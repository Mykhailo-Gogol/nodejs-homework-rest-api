const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const generatedContactId = (list) => {
  const arrayOfId = list.map(({ id }) => id)
  const arrayLength = arrayOfId.length
  const id = arrayLength > 0 ? arrayOfId[arrayLength - 1] + 1 : 1
  return id
}

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts
  } catch (err) {
    throw err.message
  }
}

const getContactById = async (contactId) => {
  try {
    const parsedContacts = await listContacts()
    const contactById = parsedContacts.find(
      ({ id }) => Number(contactId) === id
    )
    return contactById
  } catch (err) {
    throw err.message
  }
}

const removeContact = async (contactId) => {
  try {
    const parsedContacts = await listContacts()
    const filteredContacts = parsedContacts.filter(
      (el) => el.id !== Number(contactId)
    )
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), 'utf8')
    return filteredContacts
  } catch (err) {
    throw err.message
  }
}

const addContact = async (body) => {
  try {
    const parsedContacts = await listContacts()
    const id = generatedContactId(parsedContacts)
    const newContact = {
      id,
      ...body
    }
    const newContactList = [...parsedContacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf8')
    return newContact
  } catch (err) {
    throw err.message
  }
}

const updateContact = async (contactId, body) => {
  try {
    const initialContact = await getContactById(contactId)
    const parsedContacts = await listContacts()
    const updatedContact = { ...initialContact, ...body }

    const updatedContactList = parsedContacts.map((contact) =>
      contact.id === Number(contactId) ? updatedContact : contact
    )
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList), 'utf8')
    return updatedContact
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
