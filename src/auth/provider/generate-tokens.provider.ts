import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){} 

    public async signToken<T>(userId : number, expiresIn : number, payload? : T): Promise<any>{
     return await this.jwtService.signAsync({
            sub: userId,
           ...payload
        } as ActiveUserData, {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn
        });
    }   

    public async generateTokens(user:User): Promise<any>{
        try {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, {email: user.email}),
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.refreshTokenTtl, {email: user.email})
        ]);
        return {
            accessToken, refreshToken };
        } catch (error) {
            throw new RequestTimeoutException('Lỗi khi tạo token',{
                description: 'Lỗi khi tạo token',
                cause: error
            });
        }
    }
}
