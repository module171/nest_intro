import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';



@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          secure: false,
          host: configService.get('appConfig.mailHost'),
          port: 2525,
          auth: {
            user: configService.get('appConfig.mailUser'),
            pass: configService.get('appConfig.mailPass'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('appConfig.mailUser')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled: true,
          }),
          options: {
            strict: false,
          },
        },
      }),
    }),
    
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
