import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
@ApiTags('Google Authentication')
@Controller('google-authentication')
export class GoogleAuthenticationController {
	constructor(private readonly googleAuthService: GoogleAuthenticationService) {}

	@Post('login')
	@ApiOperation({ summary: 'Đăng nhập bằng Google ID token' })
	@ApiResponse({ status: 200, description: 'Đăng nhập thành công, trả về accessToken và refreshToken' })
	@ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
	@ApiBody({ type: GoogleTokenDto })
	@Auth(AuthType.None)
	@HttpCode(HttpStatus.OK)
	async login(@Body() payload: GoogleTokenDto) {
		return await this.googleAuthService.authentication(payload);
	}
}
