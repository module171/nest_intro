import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    public async createGoogleUser(googleUser: GoogleUser): Promise<User>{
        try {
            const user =this.userRepository.create(googleUser);
            return this.userRepository.save(user);
        } catch (error) {
            throw new ConflictException(error,{
                description: error.message,
                cause: error
            });
        }
    }
}
