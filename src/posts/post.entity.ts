import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 200, nullable: false })
	title: string;

	@Column({ type: 'varchar', length: 200, unique: true, nullable: false })
	slug: string;

	@Column({ type: 'text', nullable: true })
	content?: string;

	@Column({ type: 'boolean', default: false })
	isPublished: boolean;

	@ManyToOne(() => User, (user) => user.posts, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'authorId' })
	author?: User | null;

	@Column({ type: 'int', nullable: true })
	authorId?: number | null;

	@ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
	@JoinTable({ name: 'post_tags' })
	tags?: Tag[];

	@CreateDateColumn({ type: 'timestamp with time zone' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	updatedAt: Date;
}


