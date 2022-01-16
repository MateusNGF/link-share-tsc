import { settings } from ".";

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