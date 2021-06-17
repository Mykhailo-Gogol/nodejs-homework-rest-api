const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../model')

const { HttpCode } = require('../heplers/constants')
const { connectMongo } = require('../db/connections')

const getContactsController = async (req, res, next) => {
  try {
    const { ContactsCollection } = await connectMongo()
    const MongoContacts = await ContactsCollection.find({}).toArray()

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { MongoContacts }
    })
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
  }
}

const getContactByIdController = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await getContactById(id)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteContactByIdController = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const conactsList = await listContacts()
    const idList = conactsList.map((contact) => contact.id)
    if (idList.some((contactId) => contactId === Number(id))) {
      const newContactList = await removeContact(id)
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { newContactList }
      })
    } else {
      return next({
        code: HttpCode.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

const addContactController = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'contact created',
      data: { newContact }
    })
  } catch (error) {
    next(error)
  }
}

const updateContactByIdController = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const updatedContact = await updateContact(id, req.body)
    const contact = await getContactById(id)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { updatedContact }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController
}
