import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async findOneByGoogleId(googleId: string): Promise<User | null>{
        let user: User | null = null;
        try {
            user = await this.userRepository.findOneBy({ googleId });
            // if(!user){
            //     throw new UnauthorizedException('User not found');
            // }
            return user;
        } catch (error) {
            throw new RequestTimeoutException('Lỗi khi tìm kiếm user',{
                description: 'Lỗi khi tìm kiếm user',
                cause: error
            });
        }
    }
}
