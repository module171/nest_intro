import { HttpException, HttpStatus, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PostEntity } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { Tag } from '../../tags/tag.entity';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from '../providers/create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postsRepository: Repository<PostEntity>,
		private readonly paginationProvider: PaginationProvider,
		private readonly createPostProvider: CreatePostProvider
	) {}

	async createPost(payload: CreatePostDto,user: ActiveUserData): Promise<PostEntity> {
		return await this.createPostProvider.createPost(payload,user);
	}

	async getPostById(id: number): Promise<PostEntity> {
	  try {
		const post = await this.postsRepository.findOne({ where: { id }, relations: { author: true, tags: true } });
		if (!post) {
			throw new NotFoundException('Bài viết không tồn tại');

		}
		return post;
	  } catch (error) {
		 // Chỉ catch các lỗi không phải HttpException
		 if (error instanceof NotFoundException) {
			throw error; // Re-throw HttpException để giữ nguyên status code
		  }
		throw new RequestTimeoutException('Lỗi khi lấy bài viết',{
			description: 'Lỗi khi lấy bài viết',
			cause: error
		});
	  }
	}

	async updatePost(id: number, payload: UpdatePostDto): Promise<PostEntity> {
	  try {
		const post = await this.getPostById(id);
		Object.assign(post, {
			title: payload.title ?? post.title,
			slug: payload.slug ?? post.slug,
			content: payload.content ?? post.content,
			isPublished: payload.isPublished ?? post.isPublished,
			authorId: payload.authorId ?? post.authorId,
		});

		if (payload.tagIds) {
			const tags = payload.tagIds.length
				? await this.postsRepository.manager.find(Tag, { where: { id: In(payload.tagIds) } })
				: [];
			post.tags = tags;
		}

		return this.postsRepository.save(post);
	  } catch (error) {
		throw new RequestTimeoutException('Lỗi khi cập nhật bài viết',{
			description: 'Lỗi khi cập nhật bài viết',
			cause: error
		});
	  }
	  
	}

	async listPosts(query: GetPostsDto): Promise<Paginated<PostEntity>> {
	  try {
		
	   let posts = await this.paginationProvider.pagenateQuery({
		limit: query.limit,
		page: query.page
	   },this.postsRepository);
	   return posts;
	  } catch (error) {
		throw new RequestTimeoutException('Lỗi khi lấy danh sách bài viết',{
			description: 'Lỗi khi lấy danh sách bài viết',
			cause: error
		});
	  }
	}
}


