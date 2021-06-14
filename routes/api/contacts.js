const express = require('express')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact
} = require('../../validation/validate')

const {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  addContactController,
  updateContactByIdController
} = require('../../controllers/contactsController')

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.delete('/:contactId', deleteContactByIdController)

router.post('/', validateCreateContact, addContactController)

router.patch('/:contactId', validateUpdateContact, updateContactByIdController)

module.exports = router
