import { BadRequestException, Inject, Injectable, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import authConfig from '../config/auth_config';
import { UsersCreateManyProvider } from '../providers/users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from '../providers/create-user.provider';
import { FindOneUserByEmailProvider } from '../providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from '../providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from '../providers/create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
@Injectable()
export class UsersService {
    constructor(
   

        private readonly usersCreateManyProvider: UsersCreateManyProvider,

        private readonly createUserProvider: CreateUserProvider,

        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

        private readonly createGoogleUserProvider: CreateGoogleUserProvider
    ){}
    public async createUser(user: CreateUserDto): Promise<User>{
    //    let existingUser: User | null = null;
     
        return await this.createUserProvider.createUser(user);
    }
    public async createMany(createUserDto: CreateManyUsersDto): Promise<User[]> {
        return await this.usersCreateManyProvider.createMany(createUserDto);
    }
    public async findOneByEmail(email: string): Promise<User>{
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }

    public async findOneByGoogleId(googleId: string): Promise<User | null>{
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }
    public async createGoogleUser(googleUser: GoogleUser): Promise<User>{
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }
}
