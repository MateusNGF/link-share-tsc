import Joi from "joi";
import { createTransport } from "nodemailer";
import { IMailService } from "./contracts/IMailService";
import MailService from "./MailService";

export default class MailServiceByNodemailer extends MailService implements IMailService {

  private transporter : any = null

  constructor(configuration ?: IMailService.Configuration) {
    super(configuration);
    this.transporter = createTransport({
      host: this.setupConfiguration.host,
      port: this.setupConfiguration.port,
      secure: false, //SSL /TLS
      logger: false,
      debug: false,
      auth: {
        user: this.setupConfiguration.user,
        pass: this.setupConfiguration.password,
      },
    })
  }

  async isEmail(email: string): Promise<any> {
    return await Joi.string().email().validateAsync(email)
  }


  public async send(options : IMailService.SendOptions){
    if (!options.from) {options.from = this.setupConfiguration.user}

    if (!options.subject) throw Error("Subject is required")

    if (!options.to) throw Error("to is required")
    this.isEmail(String(options.to))
 
    if (!options.html) throw Error("HTML is required")

    await this.transporter.sendMail(options)
    this.transporter.close()
    return true
  }
}