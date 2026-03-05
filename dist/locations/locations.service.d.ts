import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationsService {
    private readonly locationsRepo;
    constructor(locationsRepo: Repository<Location>);
    addOne(userId: string, dto: CreateLocationDto): Promise<Location>;
    addBulk(userId: string, dtos: CreateLocationDto[]): Promise<{
        count: number;
    }>;
    findAllForUser(userId: string): Promise<Location[]>;
    deleteAllForUser(userId: string): Promise<void>;
}
