import Joi from "joi";
import { createTransport, Transporter } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";


export class Email {

  constructor(
    private readonly host: string = String(process.env.EMAIL_HOST),
    private readonly port: number = Number(process.env.EMAIL_PORT!),
    private readonly passsword: string = String(process.env.EMAIL_PASSWORD),
    private readonly user:string = String(process.env.EMAIL_USER),
    private transporter: Transporter<SMTPTransport.SentMessageInfo> = null
  ) {
    this.transporter = createTransport({
      host: this.host,
      port: this.port,
      secure: false, //SSL /TLS
      logger: false,
      debug: false,
      auth: {
        user: this.user,
        pass: this.passsword,
      },
    })
  }

  static async isEmail(email: string): Promise<any> {
    return await Joi.string().email().validateAsync(email)
  }


  public async send(options : Mail.Options){
    if (!options.from) {options.from = this.user}

    if (!options.subject) throw Error("Subject is required")

    if (!options.to) throw Error("to is required")
    Email.isEmail(String(options.to))
 
    if (!options.html) throw Error("HTML is required")

    await this.transporter.sendMail(options)
    this.transporter.close()
    return true
  }
}