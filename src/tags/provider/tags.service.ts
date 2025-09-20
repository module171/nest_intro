import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';

@Injectable()
export class TagsService {
	constructor(
		@InjectRepository(Tag)
		private readonly tagsRepository: Repository<Tag>,
	) {}

	create(payload: CreateTagDto): Promise<Tag> {
		const tag = this.tagsRepository.create(payload);
		return this.tagsRepository.save(tag);
	}

	findAll(): Promise<Tag[]> {
		return this.tagsRepository.find({ order: { id: 'DESC' } });
	}

	async findOne(id: number): Promise<Tag> {
		const tag = await this.tagsRepository.findOne({ where: { id } });
		if (!tag) throw new NotFoundException('Tag not found');
		return tag;
	}

	async update(id: number, payload: UpdateTagDto): Promise<Tag> {
		const tag = await this.findOne(id);
		Object.assign(tag, payload);
		return this.tagsRepository.save(tag);
	}

	async remove(id: number): Promise<void> {
		const tag = await this.findOne(id);
		await this.tagsRepository.remove(tag);
	}
}


