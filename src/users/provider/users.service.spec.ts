import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserProvider } from '../providers/create-user.provider';
import { UsersCreateManyProvider } from '../providers/users-create-many.provider';
import { FindOneUserByEmailProvider } from '../providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from '../providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from '../providers/create-google-user.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { HashingProvider } from '../../auth/provider/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
        
describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {

    const mockCreateUserProvider : Partial<CreateUserProvider> = {
          createUser: (createUserDto: CreateUserDto) => Promise.resolve(
           new User()
          ),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: CreateUserProvider,
        useValue: mockCreateUserProvider,
      },{
        provide: UsersCreateManyProvider,
        useValue: {
          // createMany: jest.fn(),
        },
      },{
        provide: FindOneUserByEmailProvider,
        useValue: {
          // findOneByEmail: jest.fn(),
        },
      },{
        provide: FindOneByGoogleIdProvider,
        useValue: {
          // findOneByGoogleId: jest.fn(),
        },
      },{
        provide: CreateGoogleUserProvider,
        useValue: {
          // createGoogleUser: jest.fn(),
        },
       
      }
    ,{
      provide : DataSource,
      useValue: {
        // createQueryBuilder: jest.fn(),
      },
    
    },
    {
      provide : getRepositoryToken(User),
      useValue: {
        // createQueryBuilder: jest.fn(),
      },
     },
     {
      provide : HashingProvider,
      useValue: {
        // createQueryBuilder: jest.fn(),
      },
     }
    ],
      
    }).compile();
    userService = module.get<UsersService>(UsersService);

  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  describe('createUser', () => {
    it('should create a user', async () => {
     expect(userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
     })).resolves.toEqual(new User());
    });
  });
});
