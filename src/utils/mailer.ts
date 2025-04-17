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
