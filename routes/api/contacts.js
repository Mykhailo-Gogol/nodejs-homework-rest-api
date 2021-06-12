const express = require('express')
const router = express.Router()
const { statusCode } = require('../../heplers/constants')
const {
  listContacts,
  getContactById,
  removeContact
  // addContact,
  // updateContact
} = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(statusCode.OK).json({
      status: 'success',
      code: statusCode.OK,
      data: { contacts }
    })
  } catch (error) {
    res.status(statusCode.NOT_FOUND).json({
      status: 'failed',
      code: statusCode.NOT_FOUND,
      data: {}
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
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
      res.status(statusCode.NOT_FOUND).json({
        status: 'failed',
        code: statusCode.NOT_FOUND,
        data: {}
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
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
        status: 'failed',
        code: statusCode.NOT_FOUND,
        data: {}
      })
    }
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const newContact = await addContact(req.body)
//     res.status(statusCode.CREATED).json({
//       status: 'success',
//       code: statusCode.CREATED,
//       message: 'contact created',
//       data: { newContact }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// router.patch('/:contactId', async (req, res, next) => {
//   try {
//     const id = req.params.contactId
//     if (Object.keys(req.body).length > 0) {
//       const updatedContact = await updateContact(id, req.body)
//       const contact = await getContactById(id)
//       if (contact) {
//         res.status(statusCode.OK).json({
//           status: 'success',
//           code: statusCode.OK,
//           data: { updatedContact }
//         })
//       } else {
//         return next({
//           status: statusCode.NOT_FOUND,
//           message: 'Not found'
//         })
//       }
//     } else {
//       return next({
//         status: statusCode.BAD_REQUEST,
//         message: 'missing fields'
//       })
//     }
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
