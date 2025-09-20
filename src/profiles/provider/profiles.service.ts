import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { User } from '../../users/user.entity';

@Injectable()
export class ProfilesService {
	constructor(
		@InjectRepository(Profile) private readonly profilesRepo: Repository<Profile>,
		@InjectRepository(User) private readonly usersRepo: Repository<User>,
	) {}

	async create(dto: CreateProfileDto): Promise<Profile> {
		const user = await this.usersRepo.findOne({ where: { id: dto.userId }, relations: { profile: true } });
		if (!user) throw new NotFoundException('User not found');
		if (user.profile) throw new BadRequestException('User already has a profile');
		const profile = this.profilesRepo.create({ bio: dto.bio, avatarUrl: dto.avatarUrl, user });
		return this.profilesRepo.save(profile);
	}

	async findByUserId(userId: number): Promise<Profile> {
		const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } }, relations: { user: true } });
		if (!profile) throw new NotFoundException('Profile not found');
		return profile;
	}

	async update(userId: number, dto: UpdateProfileDto): Promise<Profile> {
		const profile = await this.findByUserId(userId);
		Object.assign(profile, { bio: dto.bio ?? profile.bio, avatarUrl: dto.avatarUrl ?? profile.avatarUrl });
		return this.profilesRepo.save(profile);
	}

	async remove(userId: number): Promise<void> {
		const profile = await this.findByUserId(userId);
		await this.profilesRepo.remove(profile);
	}
}


