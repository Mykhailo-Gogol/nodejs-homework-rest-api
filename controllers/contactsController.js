const { Contact } = require('../db/contactModel')
const { HttpCode } = require('../heplers/constants')

const getContactsController = async (req, res, next) => {
  // try {
  const contacts = await Contact.find({})

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contacts }
  })
  // } catch (error) {
  //   res.status(HttpCode.NOT_FOUND).json({
  //     status: HttpCode.NOT_FOUND,
  //     message: 'Not found'
  //   })
  // }
}

const getContactByIdController = async (req, res, next) => {
  // try {
  //   const id = req.params.contactId
  //   const contact = await req.db.Contacts.findOne({ _id: ObjectId(id) })
  //   if (contact) {
  //     res.status(HttpCode.OK).json({
  //       status: 'success',
  //       code: HttpCode.OK,
  //       data: { contact }
  //     })
  //   } else {
  //     return next({
  //       status: HttpCode.NOT_FOUND,
  //       message: 'Not found'
  //     })
  //   }
  // } catch (error) {
  //   next(error)
  // }
}

const deleteContactByIdController = async (req, res, next) => {
  // try {
  //   const id = req.params.contactId
  //   const contact = await req.db.Contacts.findOne({ _id: ObjectId(id) })
  //   await req.db.Contacts.deleteOne({ _id: ObjectId(id) })
  //   if (contact) {
  //     res.status(HttpCode.OK).json({
  //       status: 'success',
  //       code: HttpCode.OK,
  //       data: { contact }
  //     })
  //   } else {
  //     return next({
  //       status: HttpCode.NOT_FOUND,
  //       message: 'Not found'
  //     })
  //   }
  // } catch (error) {
  //   next(error)
  // }
}

const addContactController = async (req, res, next) => {
  // try {
  //   const { name, email, phone, favorite } = await req.body
  //   const newContact = { name, email, phone, favorite }
  //   await req.db.Contacts.insert(newContact)
  //   res.status(HttpCode.CREATED).json({
  //     status: 'success',
  //     code: HttpCode.CREATED,
  //     message: 'contact created',
  //     data: { newContact }
  //   })
  // } catch (error) {
  //   next(error)
  // }
}

const updateContactByIdController = async (req, res, next) => {
  // try {
  //   const id = req.params.contactId
  //   const { name, email, phone, favorite } = req.body
  //   await req.db.Contacts.updateOne(
  //     { _id: ObjectId(id) },
  //     { $set: { name, email, phone, favorite } }
  //   )
  //   const contact = await req.db.Contacts.findOne({ _id: ObjectId(id) })
  //   if (contact) {
  //     res.status(HttpCode.OK).json({
  //       status: 'success',
  //       code: HttpCode.OK,
  //       data: { contact }
  //     })
  //   } else {
  //     return next({
  //       status: HttpCode.NOT_FOUND,
  //       message: 'Not found'
  //     })
  //   }
  // } catch (error) {
  //   next(error)
  // }
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
