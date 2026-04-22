import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter; 

    public constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })     
    }


    public async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: `"App Name" <${process.env.SMTP_USER}>`,
                to,
                subject: 'Account Activation',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #333;">Activate Your Account</h1>
                        <p>Please click the link below to activate your account:</p>
                        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Activate Account</a>
                        <p>Or copy this link: <a href="${link}">${link}</a></p>
                        <p>This link will expire in 24 hours.</p>
                    </div>
                `,
            });
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send activation email');
        }
    }
        



    
}
