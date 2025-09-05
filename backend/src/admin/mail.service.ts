import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegistrationMail(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      from: " <tasurron.tn@gmail.com>", 
      subject: 'Welcome to E-Commerce Admin Panel ',
      text: `Hello ${name},\n\nYour admin registration was successful!\nYou can now log in and manage the platform.\n\nThis is an automated email. Please do not reply.`,
    });
  }
}
