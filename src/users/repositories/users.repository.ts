import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.orm.findOne({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.orm.findOne({ where: { id } });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    const user = this.orm.create(data);
    return this.orm.save(user);
  }
}
