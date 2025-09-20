import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
	@ApiProperty({ description: 'Tiêu đề bài viết', minLength: 4, maxLength: 200, example: 'Hướng dẫn NestJS cơ bản' })
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(200)
	title: string;

	@ApiProperty({ description: 'Slug duy nhất', example: 'huong-dan-nestjs-co-ban' })
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(200)
	slug: string;

	@ApiPropertyOptional({ description: 'Nội dung bài viết' })
	@IsString()
	@IsOptional()
	content?: string;

	@ApiPropertyOptional({ description: 'Trạng thái publish', default: false })
	@IsBoolean()
	@IsOptional()
	isPublished?: boolean = false;

	@ApiPropertyOptional({ description: 'ID tác giả (User.id)', example: 1 })
	@IsInt()
	@IsOptional()
	@Type(() => Number)
	authorId?: number;

	@ApiPropertyOptional({ description: 'Danh sách Tag IDs', example: [1,2,3] })
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	tagIds?: number[];
}


