const { HttpCode } = require('../helpers/constants')

const {
  getContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
  updateFaforiteById
} = require('../services/contactsService')

const getContactsController = async (req, res, next) => {
  const { _id } = req.user

  const contacts = await getContacts(_id)

  if (contacts) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      contacts
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
      code: HttpCode.OK,
      status: 'success',
      contact
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
      code: HttpCode.OK,
      status: 'success',
      message: 'deleted'
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
  const { _id } = req.user

  const newContact = await addContact(req.body, _id)

  if (newContact) {
    res.status(HttpCode.CREATED).json({
      code: HttpCode.CREATED,
      status: 'success',
      message: 'created'
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
      code: HttpCode.OK,
      status: 'success',
      message: 'updated'
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
