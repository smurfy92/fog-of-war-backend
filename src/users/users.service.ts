import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { IUsersRepository, USERS_REPOSITORY } from './repositories/users.repository.interface';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const normalizedEmail = UsersService.normalizeEmail(email);
    const existing = await this.usersRepository.findByEmail(normalizedEmail);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    return this.usersRepository.create({ email: normalizedEmail, password: hashedPassword });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(UsersService.normalizeEmail(email));
  }

  /** Normalize emails so lookups and uniqueness are case/whitespace-insensitive. */
  static normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }
}
