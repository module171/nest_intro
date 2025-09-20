import { Inject, Injectable, OnModuleInit, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/provider/users.service';
import { GenerateTokensProvider } from 'src/auth/provider/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService  implements OnModuleInit {
    private oauthClient: OAuth2Client;
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly usersService: UsersService,

        private readonly generateTokensProvider: GenerateTokensProvider
    ) {
    }  

    onModuleInit() {
        this.oauthClient = new OAuth2Client(this.jwtConfiguration.googleClientId, this.jwtConfiguration.googleClientSecret);
    }
    public async authentication(googleTokenDto: GoogleTokenDto){
        try {
            const { token } = googleTokenDto;
            const ticket = await this.oauthClient.verifyIdToken({
                idToken: token,
                audience: this.jwtConfiguration.googleClientId,
            });
            const {email, sub:googleId ,given_name:firstName, family_name:lastName} = ticket.getPayload() as TokenPayload;
 
            if (!email || !googleId) {
                throw new UnauthorizedException('Google token payload missing required fields');
            }
            const safeFirstName = firstName ?? '';
            const safeLastName = lastName ?? '';

            const user = await this.usersService.findOneByGoogleId(googleId);
            if(user){
                return await this.generateTokensProvider.generateTokens(user);
            }
            const newUser = await this.usersService.createGoogleUser({email , firstName: safeFirstName, lastName: safeLastName , googleId});
            return await this.generateTokensProvider.generateTokens(newUser);
        } catch (error) {
            throw new UnauthorizedException(error,{
                description: error.message,
                cause: error
            });
        }
    
    }
}
