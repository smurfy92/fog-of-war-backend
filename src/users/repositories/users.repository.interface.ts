import { User } from '../user.entity';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; password: string }): Promise<User>;
}
