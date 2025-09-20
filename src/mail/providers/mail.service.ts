import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/user.entity';


@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ){}
 public async sendUserWelcomeEmail(user: User): Promise<void>{
    await this.mailerService.sendMail({
        to: user.email,
        from : `Onboarding Team <noreply@onboarding.com>`,
        subject: 'Welcome to our app',
        template: './welcome',
        context: { name: user.firstName,email: user.email,loginUrl: `http://localhost:3000/login` }
    });
  }
}
