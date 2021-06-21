const { Contact } = require('../db/contactModel')
const { HttpCode } = require('../heplers/constants')

const getContactsController = async (req, res, next) => {
  const contacts = await Contact.find({})

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contacts }
  })
}

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await Contact.findById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: 'Not found'
    })
  }
}

const deleteContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await Contact.findById(id)

  await Contact.findByIdAndDelete(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: 'Not found'
    })
  }
}

const addContactController = async (req, res, next) => {
  const newContact = new Contact({ ...req.body })
  await newContact.save()

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    message: 'contact created',
    data: { newContact }
  })
}

const updateContactByIdController = async (req, res, next) => {
  const id = req.params.contactId

  await Contact.findByIdAndUpdate(
    id,
    {
      $set: { ...req.body }
    },
    { new: true }
  )

  const contact = await Contact.findById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: 'Not found'
    })
  }
}

const updateFaforiteByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const { favorite } = req.body

  if (!req.body) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'missing field favorite' }
    })
  }

  await Contact.findByIdAndUpdate(id, { $set: { favorite } })

  const contact = await Contact.findById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
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
