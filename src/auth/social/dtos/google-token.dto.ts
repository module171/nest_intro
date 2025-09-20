import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class GoogleTokenDto {
    @ApiProperty({ description: 'Google token' })
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    token: string;
}