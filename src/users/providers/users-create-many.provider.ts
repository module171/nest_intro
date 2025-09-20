import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
   constructor(
    private readonly dataSource: DataSource
   ){}
    public async createMany(createUserDto: CreateManyUsersDto): Promise<User[]> {
        let newUsers: User[] = [];
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
         for(const user of createUserDto.users) {
             const newUser = queryRunner.manager.create(User, user);
             let result = await queryRunner.manager.save(User, newUser);
             newUsers.push(result);
         }
         await queryRunner.commitTransaction();
         return newUsers;
        } catch (error) {
         await queryRunner.rollbackTransaction();
         throw new RequestTimeoutException('Lỗi khi tạo user',{
             description: 'Lỗi khi tạo user',
             cause: error
         });
        }
        finally {
       try {
        await queryRunner.release();
       } catch (error) {
        throw new RequestTimeoutException('Lỗi khi giải phóng query runner',{
            description: 'Lỗi khi giải phóng query runner',
            cause: error
       });
        }
        }
     }
   
}
