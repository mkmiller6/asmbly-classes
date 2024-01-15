import NodeMailer  from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

/**
 * Sent a MIME email object to its recipient using GMail
 * @param {Object} MIMEmessage - MIME email object
 */
async function sendMIMEmessage(MIMEmessage) {

  console.debug(`Sending email subject "${MIMEmessage['subject']}" to ${MIMEmessage['to']} and CCing ${MIMEmessage['cc']}`);

  const transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail(MIMEmessage);
  } catch (error) {
    console.error(`Failed sending email subject "${MIMEmessage['subject']}" to ${MIMEmessage['to']}`, error);
  }
}

export { sendMIMEmessage };