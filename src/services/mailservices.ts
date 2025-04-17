import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendWelcomeMail = async (email: string, name: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            secure: true,
            auth: {
                user: '6ce139dcaaf787',
                pass: '0959fd71015547'
            }
        });
    
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Welcome to Our App!',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            html: `
          <h2>Hi ${name},</h2>
          <p>Welcome to our application! 🎉</p>
          <p>We’re glad to have you on board.</p>
        `,
            attachments: [
                {
                    filename: 'sample.txt',
                     path: '../attachment/sample.txt'
                },
                {
                    filename: 'sample.txt',
                     path: '../attachment/sample.txt'
                }
            ]
        };
        
        await transporter.sendMail(mailOptions);
        console.log(' Scheduled email sent!');
    } catch (error) {
        console.log(error)
    }
};





