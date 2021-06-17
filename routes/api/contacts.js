const express = require('express')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact
} = require('../../middlewares/validationMiddleware')

const modelsMiddleware = require('../../middlewares/models')

const {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController
} = require('../../controllers/contactsController')

router.use(modelsMiddleware)

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.delete('/:contactId', deleteContactByIdController)

router.post('/', validateCreateContact, addContactController)

router.patch('/:contactId', validateUpdateContact, updateContactByIdController)

router.put('/:contactId', validateReplaceContact, updateContactByIdController)

module.exports = router
