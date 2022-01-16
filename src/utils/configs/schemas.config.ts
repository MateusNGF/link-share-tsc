import Joi from "joi";

import settings from './settings.config'
import messages from './texts.config'

export const schemas = {
  user: Joi.object({
    name: Joi.string().lowercase().trim()
      .min(settings.user.text.name.min).max(settings.user.text.name.max).required()
      .messages({
        'string.base': messages.ptbr.entities.user.validation.name.type,
        'string.min': messages.ptbr.entities.user.validation.name.min,
        'string.max': messages.ptbr.entities.user.validation.name.max,
        'any.required': messages.ptbr.entities.user.validation.name.required
      }),
    nickname: Joi.string()
      .lowercase()
      .min(settings.user.text.nickname.min).max(settings.user.text.nickname.max)
      .messages({
        'string.base': messages.ptbr.entities.user.validation.nickname.type,
        'string.min': messages.ptbr.entities.user.validation.nickname.min,
        'string.max': messages.ptbr.entities.user.validation.nickname.max,
        'any.required': messages.ptbr.entities.user.validation.nickname.required,
        'string.nickname': messages.ptbr.entities.user.validation.nickname.invalidFormat
      }),
    email: Joi.string()
      .email().lowercase().required()
      .messages({
        'string.base': messages.ptbr.entities.user.validation.email.type,
        'any.required': messages.ptbr.entities.user.validation.email.required,
        'string.email': messages.ptbr.entities.user.validation.email.invalidFormat
      }),
    password: Joi.string().trim()
      .min(settings.user.text.password.min).max(settings.user.text.password.max).required()
      .messages({
        'string.base': messages.ptbr.entities.user.validation.password.type,
        'any.required': messages.ptbr.entities.user.validation.password.required,
        'string.min': messages.ptbr.entities.user.validation.password.min,
        'string.max': messages.ptbr.entities.user.validation.password.max,
      })
  }),
  link: Joi.object({
    type: Joi.string().required()
      .messages({
        'string.base': messages.ptbr.entities.link.validation.type.type,
        'any.required': messages.ptbr.entities.link.validation.type.required,
      }),
    url: Joi.string().required().regex(settings.link.text.url.regex)
      .messages({
        'string.base': messages.ptbr.entities.link.validation.url.type,
        'any.required': messages.ptbr.entities.link.validation.url.required,
        'string.pattern.base': messages.ptbr.entities.link.validation.url.invalidFormat
      })
  })
}