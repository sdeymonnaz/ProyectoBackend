import { createTransport } from "nodemailer";

export class SendEmail {
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "sdeymonnaz@gmail.com",
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
                console.log(err);
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
}