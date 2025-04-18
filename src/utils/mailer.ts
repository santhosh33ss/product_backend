import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // your Gmail address
    pass: process.env.MAIL_PASS, // app password
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  templatePath?: string;
  replacements?: { [key: string]: string };
  attachments?: { filename: string; path: string }[];
}

export const sendMail = async ({
  to,
  subject,
  templatePath,
  replacements = {},
  attachments = [],
}: SendMailOptions) => {
  let html = 'Hello!';
  if (templatePath) {
    html = fs.readFileSync(path.resolve(templatePath), 'utf-8');
    Object.keys(replacements).forEach((key) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });
  }

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};





// export const sendWelcomeEmail = async (email: string, name: string) => {
//   const transporter = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port: 2525,
//     secure: false,
//     auth: {
//       user: '6ce139dcaaf787',
//       pass: '0959fd71015547',
//     },
//   });

//   const mailOptions = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: 'Welcome to Our App!',
//     html: `
//       <h2>Hi ${name} HOW ARE YOU,</h2>
//       <p>Welcome to our application! 🎉</p>
//       <p>We’re glad to have you on board.</p>
//     `,
//     attachments: [
//       {
//         filename: 'welcome.txt',
//         content: `Welcome ${name}! Thanks for joining us.`,
//       },
//       {
//         filename: 'thankyou.txt',
//         content: `${name}, thanks for joining with us.`,
//       },
//     ],
//   };

//   await transporter.sendMail(mailOptions);
// };
