import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
	@ApiProperty({ description: 'ID của user gắn profile', example: 1 })
	@IsInt()
	@Type(() => Number)
	userId: number;

	@ApiPropertyOptional({ description: 'Giới thiệu ngắn' })
	@IsOptional()
	@IsString()
	bio?: string;

	@ApiPropertyOptional({ description: 'Ảnh đại diện (URL)', maxLength: 255 })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	avatarUrl?: string;
}


