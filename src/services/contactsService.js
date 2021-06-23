const { Contact } = require('../db/contactModel')

const getContacts = async (res) => {
  const contacts = await Contact.find({})
  return contacts
}

const getContactById = async (id, res) => {
  const contact = await Contact.findById(id)
  return contact
}

const deleteContactById = async (id) => {
  const contact = await Contact.findById(id, { useFindAndModify: false })

  await Contact.findByIdAndDelete(id)

  return contact
}

const addContact = async (body) => {
  const newContact = new Contact({ ...body })
  await newContact.save()

  return newContact
}

const updateContactById = async (id, body) => {
  await Contact.findByIdAndUpdate(
    id,
    {
      $set: { ...body }
    },
    {
      new: true,
      useFindAndModify: false
    }
  )
  const contact = await Contact.findById(id)
  return contact
}

const updateFaforiteById = async (id, body) => {
  const { favorite } = body
  await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true, useFindAndModify: false }
  )

  const contact = await Contact.findById(id)
  return contact
}

module.exports = {
  getContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
  updateFaforiteById
}
