const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // const smptConf = {
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_EMAIL,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  //   logger: true,
  // };

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'keyon.morissette@ethereal.email',
      pass: 'xZN3qTvmpB6GX1E68c',
    },
  });
  // const transport = nodemailer.createTransport(smptConf);

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
