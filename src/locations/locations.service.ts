import { Injectable, Inject } from '@nestjs/common';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { ILocationsRepository, LOCATIONS_REPOSITORY } from './repositories/locations.repository.interface';

@Injectable()
export class LocationsService {
  constructor(
    @Inject(LOCATIONS_REPOSITORY)
    private readonly locationsRepository: ILocationsRepository,
  ) {}

  addOne(userId: string, dto: CreateLocationDto): Promise<Location> {
    return this.locationsRepository.save({
      userId,
      latitude: dto.latitude,
      longitude: dto.longitude,
      accuracy: dto.accuracy,
      visitedAt: dto.visitedAt,
    });
  }

  async addBulk(userId: string, dtos: CreateLocationDto[]): Promise<{ count: number }> {
    const saved = await this.locationsRepository.saveMany(
      dtos.map((dto) => ({
        userId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        accuracy: dto.accuracy,
        visitedAt: dto.visitedAt,
      })),
    );
    return { count: saved.length };
  }

  findAllForUser(userId: string): Promise<Location[]> {
    return this.locationsRepository.findAllForUser(userId);
  }

  deleteAllForUser(userId: string): Promise<void> {
    return this.locationsRepository.deleteAllForUser(userId);
  }
}
