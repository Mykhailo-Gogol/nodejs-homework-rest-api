const express = require('express')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact
} = require('../../middlewares/validationMiddleware')

const { asyncWrapper } = require('../../heplers/asyncWrapper')

const {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController
} = require('../../controllers/contactsController')

router.get('/', asyncWrapper(getContactsController))

router.get('/:contactId', asyncWrapper(getContactByIdController))

router.delete('/:contactId', asyncWrapper(deleteContactByIdController))

router.post('/', validateCreateContact, asyncWrapper(addContactController))

router.patch(
  '/:contactId',
  validateUpdateContact,
  asyncWrapper(updateContactByIdController)
)

router.put(
  '/:contactId',
  validateReplaceContact,
  asyncWrapper(updateContactByIdController)
)

module.exports = router
