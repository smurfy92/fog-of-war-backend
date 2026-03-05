import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
