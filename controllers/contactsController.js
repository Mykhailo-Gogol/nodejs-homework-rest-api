const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../model')

const { statusCode } = require('../heplers/constants')

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(statusCode.OK).json({
      status: 'success',
      code: statusCode.OK,
      data: { contacts }
    })
  } catch (error) {
    res.status(statusCode.NOT_FOUND).json({
      status: statusCode.NOT_FOUND,
      message: 'Not found'
    })
  }
}

const getContactByIdController = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await getContactById(id)
    if (contact) {
      res.status(statusCode.OK).json({
        status: 'success',
        code: statusCode.OK,
        data: { contact }
      })
    } else {
      return next({
        status: statusCode.NOT_FOUND,
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
      res.status(statusCode.OK).json({
        status: 'success',
        code: statusCode.OK,
        data: { newContactList }
      })
    } else {
      return next({
        code: statusCode.NOT_FOUND,
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
    res.status(statusCode.CREATED).json({
      status: 'success',
      code: statusCode.CREATED,
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
      res.status(statusCode.OK).json({
        status: 'success',
        code: statusCode.OK,
        data: { updatedContact }
      })
    } else {
      return next({
        status: statusCode.NOT_FOUND,
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
