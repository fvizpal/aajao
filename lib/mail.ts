import nodemailer from 'nodemailer';

interface EmailContent {
  subject: string
  body: string
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'pvishal96@outlook.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1
})

export const sendVerificationEmail = async (emailContent: EmailContent, sendTo: string) => {
  const mailOptions = {
    from: 'pvishal96@outlook.com',
    to: sendTo,
    subject: emailContent.subject,
    html: emailContent.body,
  }

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}