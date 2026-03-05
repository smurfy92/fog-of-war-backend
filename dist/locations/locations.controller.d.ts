import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { BulkCreateLocationDto } from './dto/bulk-create-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    addOne(req: any, dto: CreateLocationDto): Promise<import("./location.entity").Location>;
    addBulk(req: any, dto: BulkCreateLocationDto): Promise<{
        count: number;
    }>;
    findAll(req: any): Promise<import("./location.entity").Location[]>;
    deleteAll(req: any): Promise<void>;
}
