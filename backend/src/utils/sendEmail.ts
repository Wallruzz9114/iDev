import nodemailer from 'nodemailer';

const sendEmail = async (to: string, html: string) => {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log('test account', testAccount);

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'dtzbf65gywme53m2@ethereal.email',
      pass: 'BYQgtqkAVsbqvAvkk2',
    },
  });

  let info = await transporter.sendMail({
    from: '"Jose Pinto 👻" <pintojose.benedicto2@gmail.com>',
    to,
    subject: 'Change password',
    html,
  });

  console.log('Message sent %s', info.messageId);
  console.log('Preview URL %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;
