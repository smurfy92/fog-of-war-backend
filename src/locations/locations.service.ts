import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepo: Repository<Location>,
  ) {}

  async addOne(userId: string, dto: CreateLocationDto): Promise<Location> {
    const location = this.locationsRepo.create({
      user: { id: userId },
      latitude: dto.latitude,
      longitude: dto.longitude,
      accuracy: dto.accuracy,
      visitedAt: dto.visitedAt,
    });
    return this.locationsRepo.save(location);
  }

  async addBulk(userId: string, dtos: CreateLocationDto[]): Promise<{ count: number }> {
    const locations = dtos.map((dto) =>
      this.locationsRepo.create({
        user: { id: userId },
        latitude: dto.latitude,
        longitude: dto.longitude,
        accuracy: dto.accuracy,
        visitedAt: dto.visitedAt,
      }),
    );
    await this.locationsRepo.save(locations);
    return { count: locations.length };
  }

  async findAllForUser(userId: string): Promise<Location[]> {
    return this.locationsRepo.find({
      where: { user: { id: userId } },
      order: { visitedAt: 'ASC' },
      select: ['id', 'latitude', 'longitude', 'accuracy', 'visitedAt', 'createdAt'],
    });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.locationsRepo.delete({ user: { id: userId } });
  }
}
