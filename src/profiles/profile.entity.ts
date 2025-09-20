import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: true })
	bio?: string | null;

	@Column({ type: 'varchar', length: 255, nullable: true })
	avatarUrl?: string | null;

	@OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User;
}


