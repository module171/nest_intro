import { Injectable, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    public async findOneByEmail(email: string): Promise<User> {
        let user: User | null = null;

        try {
            user = await this.userRepository.findOneBy({ email });
            if(!user){
                throw new UnauthorizedException('User not found');
            }
            return user;
        } catch (error) {
            if(error instanceof UnauthorizedException){
                throw error;
            }
            throw new RequestTimeoutException('Lỗi khi tìm kiếm user',{
                description: 'Lỗi khi tìm kiếm user',
                cause: error
            });
        }
    }
}
