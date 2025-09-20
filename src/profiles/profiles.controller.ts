import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProfilesService } from './provider/profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { Profile } from './profile.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('Profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	@Post()
	@ApiOperation({ summary: 'Create profile for a user' })
	@ApiResponse({ status: 201, description: 'Profile created' })
	@ApiBody({ type: CreateProfileDto })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() dto: CreateProfileDto): Promise<Profile> {
		return this.profilesService.create(dto);
	}

	@Get('user/:userId')
	@ApiOperation({ summary: 'Get profile by user id' })
	findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Profile> {
		return this.profilesService.findByUserId(userId);
	}

	@Patch('user/:userId')
	@ApiOperation({ summary: 'Update profile by user id' })
	update(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() dto: UpdateProfileDto,
	): Promise<Profile> {
		return this.profilesService.update(userId, dto);
	}

	@Delete('user/:userId')
	@ApiOperation({ summary: 'Delete profile by user id' })
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
		await this.profilesService.remove(userId);
	}
}


