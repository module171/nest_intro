import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from '../../auth/provider/hashing.provider';
import { MailService } from '../../mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {

   constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
   ){}
    public async createUser(user: CreateUserDto): Promise<User>{
        //    let existingUser: User | null = null;
            try {
                const  existingUser = await this.userRepository.findOne({
                    where : {
                        email : user.email
                    }
                });
                if(existingUser){
                    throw new BadRequestException('Email đã tồn tại');
                }
                const newUser = this.userRepository.create({
                    ...user,
                    password: await this.hashingProvider.hashPassword(user.password)
                });
                await this.mailService.sendUserWelcomeEmail(newUser);
                const savedUser = await this.userRepository.save(newUser);
              
                return savedUser;
            } catch (error) {
                throw new RequestTimeoutException(error);
            }
    
        }
}
