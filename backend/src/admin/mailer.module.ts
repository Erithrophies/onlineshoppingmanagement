import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER || 'tasurron.tn@gmail.com',
          pass: process.env.MAIL_PASS || 'guwm izpu xmvx hdhl ',
        },
      },
      defaults: {
        from: process.env.MAIL_FROM || " <tasurron.tn@gmail.com>",
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
