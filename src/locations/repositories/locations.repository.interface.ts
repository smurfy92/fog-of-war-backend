import { Location } from '../location.entity';

export const LOCATIONS_REPOSITORY = 'LOCATIONS_REPOSITORY';

export interface LocationData {
  userId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  visitedAt: number;
}

export interface ILocationsRepository {
  save(data: LocationData): Promise<Location>;
  saveMany(data: LocationData[]): Promise<Location[]>;
  findAllForUser(userId: string): Promise<Location[]>;
  deleteAllForUser(userId: string): Promise<void>;
}
