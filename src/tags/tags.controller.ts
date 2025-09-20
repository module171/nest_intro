import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TagsService } from './provider/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import { Tag } from './tag.entity';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Get()
	@ApiOperation({ summary: 'List tags' })
	findAll(): Promise<Tag[]> {
		return this.tagsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get tag by id' })
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
		return this.tagsService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create tag' })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() body: CreateTagDto): Promise<Tag> {
		return this.tagsService.create(body);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update tag' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateTagDto,
	): Promise<Tag> {
		return this.tagsService.update(id, body);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete tag' })
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		await this.tagsService.remove(id);
	}
}


