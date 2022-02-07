import * as mailer from "nodemailer";

const emailHost = process.env.EMAIL_HOST as string;
const emailPort = parseInt(process.env.EMAIL_PORT!);
const emailPassword = process.env.EMAIL_PASSWORD as string;
export const appEmail = "no-reply@linkshare.com.br";

export const emailLogo = "https://linkshare.com.br/email-logo.png";
export const emailBtnConfirmIcon = "https://linkshare.com.br/email-btn-confirm.png";
export const reportUrl = "https://linkshare.com.br/report";

export const sendTransport = mailer.createTransport({
   host: "smtp.umbler.com",
   port: emailPort,
   secure: false, //SSL /TLS
   logger: false,
   debug: false,
   auth: {
      user: appEmail,
      pass: "cLE+vCM!73",
   },
});
