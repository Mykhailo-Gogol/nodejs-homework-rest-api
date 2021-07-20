const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaResendVerificationEmail = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false }
    })
    .required()
})

const validateResendVerificationEmail = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new Error('missing required field email'))
  }
  return validate(schemaResendVerificationEmail, req.body, next)
}

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z\d\-_\s]+$/i)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'ca'] }
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
      tlds: { allow: ['com', 'net', 'uk', 'ca'] }
    })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional()
})

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required()
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
      tlds: { allow: ['com', 'net', 'uk', 'ca'] }
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

const validateUpdateFavorite = (req, res, next) => {
  return validate(schemaUpdateFavorite, req.body, next)
}

const validateReplaceContact = (req, res, next) => {
  return validate(schemaReplaceContact, req.body, next)
}

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateReplaceContact,
  validateUpdateFavorite,
  validateResendVerificationEmail
}
