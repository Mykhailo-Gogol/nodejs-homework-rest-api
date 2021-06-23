const express = require('express')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact,
  validateUpdateFavorite
} = require('../../middlewares/validationMiddleware')

const { asyncErrorWrapper } = require('../../heplers/asyncErrorWrapper')

const {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController,
  updateFaforiteByIdController
} = require('../../controllers/contactsController')

router.get('/', asyncErrorWrapper(getContactsController))

router.get('/:contactId', asyncErrorWrapper(getContactByIdController))

router.delete('/:contactId', asyncErrorWrapper(deleteContactByIdController))

router.post('/', validateCreateContact, asyncErrorWrapper(addContactController))

router.patch(
  '/:contactId',
  validateUpdateContact,
  asyncErrorWrapper(updateContactByIdController)
)
router.patch(
  '/:contactId/favorite',
  validateUpdateFavorite,
  asyncErrorWrapper(updateFaforiteByIdController)
)

router.put(
  '/:contactId',
  validateReplaceContact,
  asyncErrorWrapper(updateContactByIdController)
)

module.exports = router
