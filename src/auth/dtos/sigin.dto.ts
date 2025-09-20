import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {

    @ApiProperty({ description: 'Email', example: 'example@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Mật khẩu', example: 'password' })
    @IsString()
    @IsNotEmpty()
    password: string;   
}