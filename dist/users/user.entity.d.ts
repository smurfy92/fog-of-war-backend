import { Location } from '../locations/location.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    locations: Location[];
    createdAt: Date;
    updatedAt: Date;
}
