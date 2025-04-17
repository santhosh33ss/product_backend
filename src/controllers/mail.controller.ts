import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = async (req: Request, res: Response) => {
  try {
    const { to, subject, htmlContent } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!to || !subject || !htmlContent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const attachments = files?.map(file => ({
      filename: file.originalname,
      path: file.path,
    })) || [];

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Mail sent successfully' });
  } catch (error) {
    console.error('Error sending mail:', error);
    res.status(500).json({ message: 'Failed to send mail' });
  }
};










