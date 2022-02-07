import { MailOptions } from "nodemailer/lib/stream-transport";
import { sendTransport, appEmail } from "../config";
import { EmailValidate } from "../templates";

const frontend_host = process.env.FRONTEND_HOST as string;

export async function SendEmailValidateCode(email: string, uuid: string, name: string) {
   try {
      const validateUrl = `${frontend_host}email/confirm/${email}&${uuid}`;
      const message = {
         from: `<${appEmail}>`,
         to: email,
         subject: "Confirme seu e-email",
         html: EmailValidate(email, name, validateUrl),
      } as MailOptions;

      await sendTransport.sendMail(message);
      sendTransport.close();
      return true;
   } catch (error) {
      console.log("Error in SendEmailValidateCode :", error);
      return false;
   }
}
