import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PostEntity } from '../posts/post.entity';

@Entity()
@Unique(['name'])
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 64, nullable: false })
	name: string;

	@ManyToMany(() => PostEntity, (post) => post.tags)
	posts: PostEntity[];
}


