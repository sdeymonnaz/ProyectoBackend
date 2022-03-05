import { createTransport } from "nodemailer";

//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');

export class SendEmail {
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: "nopvoshqjfduqfbm"
      }
    });
  }

    sendEmail(email, subject, text) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail({
                from: "Server Proyecto Backend",
                to: email,
                subject: subject,
                text: text
            }
            , (err, info) => {
              loggerApi.error(`Error en metodo sendEmail: ${err}`);
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
}