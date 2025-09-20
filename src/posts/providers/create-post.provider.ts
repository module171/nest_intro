import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostEntity } from '../post.entity';
import { Tag } from '../../tags/tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { UsersService } from 'src/users/provider/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class CreatePostProvider {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postsRepository: Repository<PostEntity>,

        private readonly userService: UsersService
    ){}
    async createPost(payload: CreatePostDto ,user : ActiveUserData): Promise<PostEntity> {
        let author : User | undefined;
        try {
            author = await this.userService.findOneByEmail(user.email);
        } catch (error) {
            throw new ConflictException('Lỗi khi tìm user',{
                description: 'Lỗi khi tìm user',
                cause: error
            });
        }
        if(!author){
            throw new ConflictException('User not found');
        }
        try {
          const post = this.postsRepository.create({
              title: payload.title,
              slug: payload.slug,
              content: payload.content,
              isPublished: payload.isPublished ?? false,
              authorId: author.id,
          });
  
          if (payload.tagIds && payload.tagIds.length) {
              const tags = await this.postsRepository.manager.find(Tag, { where: { id: In(payload.tagIds) } });
              post.tags = tags;
          }
  
          return this.postsRepository.save(post);
        } catch (error) {
          throw new RequestTimeoutException('Lỗi khi tạo bài viết',{
              description: 'Lỗi khi tạo bài viết',
              cause: error
          });
        }
      }
}
