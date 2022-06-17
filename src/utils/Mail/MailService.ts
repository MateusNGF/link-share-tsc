import { IMailService } from "./contracts/IMailService"

export const SETUP_CONFIGURATION = {
  host : String(process.env.EMAIL_HOST),
  port : Number(process.env.EMAIL_PORT!),
  user : String(process.env.EMAIL_USER),
  password: String(process.env.EMAIL_PASSWORD)
}

export default abstract class MailService  {
  constructor(
    readonly setupConfiguration : IMailService.Configuration = SETUP_CONFIGURATION
  ){}
} 