import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfilesService } from './provider/profiles.service';
import { ProfilesController } from './profiles.controller';
import { User } from '../users/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Profile, User])],
	providers: [ProfilesService],
	controllers: [ProfilesController],
	exports: [ProfilesService],
})
export class ProfilesModule {}


