import { forwardRef, Module } from '@nestjs/common';
import { AuthProvider } from './provider/auth-provider';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { SignInProvider } from './provider/sign-in.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './provider/generate-tokens.provider';
import { RefreshTokenProvider } from './provider/refresh-token.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';

@Module({
  providers: [AuthProvider, {
    provide: HashingProvider,
    useClass: BcryptProvider
  }, SignInProvider, GenerateTokensProvider, RefreshTokenProvider, GoogleAuthenticationService],
  controllers: [AuthController, GoogleAuthenticationController],
  imports: [forwardRef(() => UsersModule),ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()) , ],
  exports: [AuthProvider, HashingProvider,   ],
})
export class AuthModule {}
