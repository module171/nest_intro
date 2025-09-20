import { IsNotEmpty, IsString } from "class-validator";
import { IsJWT } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
    @ApiProperty({ description: 'Refresh token' })
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    refreshToken: string;
}