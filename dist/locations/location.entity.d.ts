import { User } from '../users/user.entity';
export declare class Location {
    id: string;
    user: User;
    latitude: number;
    longitude: number;
    accuracy: number;
    visitedAt: number;
    createdAt: Date;
}
