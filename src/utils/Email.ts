import Joi from "joi";

export class Email {

  static async isEmail(email: string): Promise<any> {
    return await Joi.string().email().validateAsync(email)
  }
}