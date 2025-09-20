import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/provider/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../interfaces/active-user.interface';
@Injectable()
export class RefreshTokenProvider {
   
    constructor(
        
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,   
        
        private readonly generateTokensProvider: GenerateTokensProvider
      ) {
        
    }
    public async refreshToken(refreshToken: RefreshTokenDto): Promise<any>{
        try {
           const {sub, email} = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub' | 'email'>>(refreshToken.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });
            const user = await this.usersService.findOneByEmail(email);
            return await this.generateTokensProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
