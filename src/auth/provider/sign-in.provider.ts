import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/provider/users.service';
import { SignInDto } from '../dtos/sigin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

    
@Injectable()
export class SignInProvider {
    constructor(

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,    

        private readonly hashingProvider: HashingProvider,

        private readonly generateTokensProvider: GenerateTokensProvider,

       
    ){}
    public async signIn(signInDto: SignInDto): Promise<any>{
    try {
        const {email, password} = signInDto;
        let user = await this.usersService.findOneByEmail(email);
        let isPasswordValid = await this.hashingProvider.comparePassword(password, user.password ?? '');
        if(!isPasswordValid){
            throw new UnauthorizedException('Mật khẩu không hợp lệ');
        }
        return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
        if(error instanceof UnauthorizedException){
            throw error;
        }
        throw new RequestTimeoutException('Lỗi khi đăng nhập',{
            description: 'Lỗi khi đăng nhập',
            cause: error
        });
     }
    }

   
}
