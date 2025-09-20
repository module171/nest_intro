import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './provider/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
// import { UsersCreate=manyProvider } from './providers/users-create=many.provider';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import authConfig from './config/auth_config';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { MailModule } from 'src/mail/mail.module';
@Module({
  providers: [UsersService,  UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider, FindOneByGoogleIdProvider, CreateGoogleUserProvider,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard
    // }
  ],
  controllers: [UsersController],
  exports : [UsersService],
  imports : [TypeOrmModule.forFeature([User]),ConfigModule.forFeature(authConfig),forwardRef(() => AuthModule,),MailModule,
  ConfigModule.forFeature(jwtConfig),
  JwtModule.registerAsync(jwtConfig.asProvider()) 
]
})
export class UsersModule {}
