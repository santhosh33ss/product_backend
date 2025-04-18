import { sendMail } from '../controllers/mail.controller';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

const sendMailMock = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

describe('Mail Controller - sendMail', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        to: 'test@example.com',
        subject: 'Test Subject',
        htmlContent: '<p>Hello</p>',
      },
      files: [
        {
          originalname: 'file.txt',
          path: '/uploads/file.txt',
        },
      ] as any,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should send mail successfully', async () => {
    sendMailMock.mockResolvedValueOnce({});

    await sendMail(req as Request, res as Response);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.MAIL_USER,
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Hello</p>',
      attachments: [
        {
          filename: 'file.txt',
          path: '/uploads/file.txt',
        },
      ],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Mail sent successfully' });
  });

  it('should return 400 if required fields are missing', async () => {
    req.body = {}; // Missing all fields

    await sendMail(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });

  it('should return 500 if sendMail throws an error', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('Send failed'));

    await sendMail(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to send mail' });
  });
});
