import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersRepository, USERS_REPOSITORY } from './repositories/users.repository.interface';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<IUsersRepository>;

  beforeEach(async () => {
    repo = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: USERS_REPOSITORY, useValue: repo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('normalizeEmail', () => {
    it('lowercases and trims the email', () => {
      expect(UsersService.normalizeEmail('  Foo@Bar.COM ')).toBe('foo@bar.com');
    });
  });

  describe('create', () => {
    it('normalizes the email before lookup and persistence', async () => {
      repo.findByEmail.mockResolvedValue(null);
      repo.create.mockImplementation(async (data) => ({ id: '1', ...data } as User));

      await service.create('  Foo@Bar.COM ', 'secret');

      expect(repo.findByEmail).toHaveBeenCalledWith('foo@bar.com');
      const createArg = repo.create.mock.calls[0][0];
      expect(createArg.email).toBe('foo@bar.com');
      // Password must be hashed, not stored in plaintext.
      expect(createArg.password).not.toBe('secret');
    });

    it('throws ConflictException when the (normalized) email already exists', async () => {
      repo.findByEmail.mockResolvedValue({ id: '1', email: 'foo@bar.com' } as User);

      await expect(service.create('FOO@BAR.com', 'secret')).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(repo.create).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('normalizes the email before lookup', async () => {
      repo.findByEmail.mockResolvedValue(null);

      await service.findByEmail('  USER@Example.Com ');

      expect(repo.findByEmail).toHaveBeenCalledWith('user@example.com');
    });
  });
});
