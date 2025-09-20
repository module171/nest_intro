import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './provider/posts.service';
import { PostEntity } from './post.entity';
import { Tag } from '../tags/tag.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, Tag]),PaginationModule,UsersModule],
	controllers: [PostsController],
	providers: [PostsService, CreatePostProvider],
	exports: [PostsService],
})
export class PostsModule {}


