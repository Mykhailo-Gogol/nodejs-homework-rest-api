const { HttpCode } = require('../heplers/constants')

const {
  getContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
  updateFaforiteById
} = require('../services/contactsService')

const getContactsController = async (req, res, next) => {
  const contacts = await getContacts()

  if (contacts) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await getContactById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

const deleteContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await deleteContactById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      message: 'deleted',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body)

  if (newContact) {
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'created',
      data: { newContact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

const updateContactByIdController = async (req, res, next) => {
  const id = req.params.contactId

  const contact = await updateContactById(id, req.body)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'updated',
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

const updateFaforiteByIdController = async (req, res, next) => {
  const id = req.params.contactId

  const contact = await updateFaforiteById(id, req.body)

  if (!req.body) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'missing field favorite' }
    })
  }

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'updated',
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      code: HttpCode.BAD_REQUEST,
      status: 'success',
      message: 'Not found'
    })
  }
}

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController,
  updateFaforiteByIdController
}
