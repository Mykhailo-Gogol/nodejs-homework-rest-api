const Joi = require('joi')
const { HttpCode } = require('../heplers/constants')

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z\d\-_\s]+$/i)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] }
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z\d\-_\s]+$/i)
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] }
    })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional()
})

const schemaReplaceContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z\d\-_\s]+$/i)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] }
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
})

const validate = (shema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'missing fields'
    })
  }
  const { error } = shema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `${message.replace(/"/g, '')}`
    })
  }
  next()
}

const validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

const validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

const validateReplaceContact = (req, res, next) => {
  return validate(schemaReplaceContact, req.body, next)
}

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact
}
