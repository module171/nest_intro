import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { User } from 'src/users/user.entity';
import { SignInDto } from '../dtos/sigin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenProvider } from './refresh-token.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
@Injectable()
export class AuthProvider {

    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,


        private readonly signInProvider: SignInProvider,

        private readonly refreshTokenProvider: RefreshTokenProvider
    ){}
    public async signIn(signInDto: SignInDto): Promise<User>{
        return this.signInProvider.signIn(signInDto);
    }
    public async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<User>{
        return this.refreshTokenProvider.refreshToken(refreshTokenDto);
    }
}
