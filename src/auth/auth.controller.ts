import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthProvider } from './provider/auth-provider';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { SignInDto } from './dtos/sigin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authProvider: AuthProvider
    ) {
        
    }
    @Post('sign-in')
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 201, description: 'User signed in successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiBody({ type: SignInDto })
    @HttpCode(HttpStatus.CREATED)
    @Auth(AuthType.None)
    signIn(@Body() signInDto: SignInDto): Promise<User>{
        return this.authProvider.signIn(signInDto);
    }
    
    @Post('refresh-token')
    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 201, description: 'Token refreshed successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiBody({ type: RefreshTokenDto })
    @HttpCode(HttpStatus.CREATED)
    @Auth(AuthType.None)
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<User>{
        return this.authProvider.refreshToken(refreshTokenDto);
    }
}
