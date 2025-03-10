const express = require('express')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact,
  validateUpdateFavorite
} = require('../../middlewares/validationMiddleware')

const { asyncWrapper } = require('../../helpers/apiHelpers')

const { authMiddleware } = require('../../middlewares/authMiddleware')

const {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController,
  updateFaforiteByIdController
} = require('../../controllers/contactsController')

router.use(authMiddleware)

router.get('/', asyncWrapper(getContactsController))

router.get('/:contactId', asyncWrapper(getContactByIdController))

router.delete('/:contactId', asyncWrapper(deleteContactByIdController))

router.post('/', validateCreateContact, asyncWrapper(addContactController))

router.patch(
  '/:contactId',
  validateUpdateContact,
  asyncWrapper(updateContactByIdController)
)
router.patch(
  '/:contactId/favorite',
  validateUpdateFavorite,
  asyncWrapper(updateFaforiteByIdController)
)

router.put(
  '/:contactId',
  validateReplaceContact,
  asyncWrapper(updateContactByIdController)
)

module.exports = router
