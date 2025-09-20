import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
	@ApiProperty({ description: 'Tên tag', minLength: 2, maxLength: 64, example: 'nestjs' })
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(64)
	name: string;
}


