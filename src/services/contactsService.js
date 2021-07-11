const { Contact } = require('../model/contactModel')

const getContacts = async (userId) => {
  const contacts = await Contact.find({ userId })
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

const addContact = async (body, userId) => {
  const newContact = new Contact({ ...body, userId })
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
