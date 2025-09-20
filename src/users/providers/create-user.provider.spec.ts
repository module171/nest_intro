import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

import { CreateUserProvider } from '../providers/create-user.provider';
import { User } from '../user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { MailService } from '../../mail/providers/mail.service';
import { HashingProvider } from '../../auth/provider/hashing.provider';

type MockRepository<T = any> = Partial<
  Record<keyof Repository<T & ObjectLiteral>, jest.Mock>
>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});
describe('CreateUserProvider', () => {
  let createUserProvider: CreateUserProvider;
  let usersRepository: MockRepository<User>;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>(),
        },
        {
          provide: MailService,
          useValue: {
            sendUserWelcomeEmail: jest.fn((user: User) => Promise.resolve()),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => user.password),
          },
        },
      ],
    }).compile();
    createUserProvider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(createUserProvider).toBeDefined();
  });
  describe('createUser', () => {
    describe('when user does not exist', () => {
      it('should create a user', async () => {
        usersRepository.findOne!.mockResolvedValue(undefined);
        usersRepository.create!.mockReturnValue(user);
        usersRepository.save!.mockResolvedValue(user);
        const newUser = await createUserProvider.createUser(user);
        expect(usersRepository.findOne!).toHaveBeenNthCalledWith(1, {
          where: {
            email: user.email,
          },
        });
        expect(usersRepository.create!).toHaveBeenNthCalledWith(1, user);
        expect(usersRepository.save!).toHaveBeenNthCalledWith(1, user);
      });
    });
    describe('when user exists', () => {
      it('should throw an error', async () => {
        usersRepository.findOne!.mockResolvedValue(user as any);
        usersRepository.create!.mockReturnValue(user);
        usersRepository.save!.mockResolvedValue(user);
        try {
          const newUser = await createUserProvider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(RequestTimeoutException);
          expect(error.message).toBe('Email đã tồn tại');
        }
      });
    });
  });
});
