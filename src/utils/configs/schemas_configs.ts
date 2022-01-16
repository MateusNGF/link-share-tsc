import Joi from 'joi'


export const settings = {
  user: {
    text: {
      name: { min: 20, max: 50 },
      nickname: { min: 10, max: 40, prefix: "@", regex: /^@[a-z0-9]$/ },
      description: { min: 30, max: 500 },
      password: { min: 10, max: 350, regex: /^[a-z]{5,10}\[0-9]{4,7}$/ }
    },
  },
  link: {
    text: {
      url: { regex: /^((http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ }
    }
  }
}

export const messages = {
  ptbr: {
    entities: {
      user: {
        validation: {
          name: {
            type: "O Nome precisa ser em formato de string.",
            min: `Nome deve ser maior que ${settings.user.text.name.min} caracteres.`,
            max: `Nome deve ser menor que ${settings.user.text.name.max} caracteres.`,
            required: `Nome é necessário.`
          },
          email: {
            required: "E-mail é necessário.",
            type: "O E-mail precisa ser no formato de string.",
            invalidFormat: "E-mail esta em um formato invalido."
          },
          nickname: {
            type: "O Nickname precisa ser em formato de string.",
            min: `Nickname deve ser maior que ${settings.user.text.nickname.min} caracteres.`,
            max: `Nickname deve ser menor que ${settings.user.text.nickname.max} caracteres.`,
            required: `Nickname é necessário.`,
            invalidFormat: `Nickname precisar ser do formato ${settings.user.text.nickname.prefix}seu_nickname.`
          },
          password: {
            type: "A Senha precisa ser uma string.",
            min: `A Senha deve ser maior que ${settings.user.text.password.min} caracteres.`,
            max: `A Senha deve ser menor que ${settings.user.text.password.max} caracteres.`,
            required: `A Senha é necessário.`,
            invalidFormat: "A Senha é muito fraca :^( ... Tente adiconar caracteres especiais e numeros."
          }
        }
      },
      link: {
        validation: {
          type: {
            type: "O Tipo type deve ser uma string.",
            required: "O type é necessário.",
            invalidType: "Não há suporte para este site."
          },
          url: {
            type: "A url deve ser uma string.",
            required: "A url é necessário.",
            invalidFormat: "Endereço mal formatado ou não há suporte (ftp, ssl, ...)"
          }
        }
      }
    }
  }
}


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




const valid = async () => {
  try {
    const user = {
      name: "3213131312312133123213",
      nickname: "a1212313213",
      email: "mateus@este.com",
      password: "teste@#$@#@#@#@212$%31232414213"
    }

    const link = {
      type: "Insta",
      url: "http://wwww.google.com.br"
    }

    await schemas.link.validateAsync(link)
  } catch (e) {
    console.log(e);
  }
}


valid()