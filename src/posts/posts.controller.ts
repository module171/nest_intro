import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './provider/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './post.entity';
import { ConfigService } from '@nestjs/config';
import { GetPostsDto } from './dtos/get-posts.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(private readonly postsService: PostsService ,

		private configService: ConfigService
	) {}

	@Get()
	@ApiOperation({ summary: 'List posts' })
	@ApiResponse({ status: 200, description: 'Return posts list' })
	@Auth(AuthType.Bearer)
	list(@Query() query: GetPostsDto): Promise<Paginated<PostEntity>> {
		// console.log(query);
		return this.postsService.listPosts(query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get post by id' })
	getById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
		return this.postsService.getPostById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create post' })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() body: CreatePostDto, @ActiveUser() user: ActiveUserData): Promise<PostEntity> {
		return this.postsService.createPost(body,user);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update post' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdatePostDto,
	): Promise<PostEntity> {
		return this.postsService.updatePost(id, body);
	}
}


