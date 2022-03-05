import twilio from 'twilio';


export default class SendSMS {
  constructor(from) {
    this.client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.from = from;
    }

  send(to, body) {
    return this.client.messages
      .create({
        from: this.from,
        to,
        body
      })
      .then(message => message.sid);
    }
}
