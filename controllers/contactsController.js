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
  }

  if (!contact) {
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
  }

  if (!contact) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: 'Not found'
    })
  }
}

const addContactController = async (req, res, next) => {
  const { name, email, phone, favorite } = await req.body

  const newContact = new Contact({ name, email, phone, favorite })
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
  const { name, email, phone, favorite } = req.body

  await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite }
  })

  const contact = await Contact.findById(id)

  if (contact) {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  }

  if (!contact) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: 'Not found'
    })
  }
}

// const updateFaforiteByIdController = async (req, res, next) => {
//   try {
//     const id = req.params.contactId
//     const { name, email, phone } = req.body

//     await req.db.Contacts.updateOne(
//       { _id: ObjectId(id) },
//       { $set: { name, email, phone } }
//     )

//     const contact = await req.db.Contacts.findOne({ _id: ObjectId(id) })

//     if (contact) {
//       res.status(HttpCode.OK).json({
//         status: 'success',
//         code: HttpCode.OK,
//         data: { contact }
//       })
//     } else {
//       return next({
//         status: HttpCode.NOT_FOUND,
//         message: 'Not found'
//       })
//     }
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController
}
