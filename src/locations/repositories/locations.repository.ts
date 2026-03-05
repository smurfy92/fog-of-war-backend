import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../location.entity';
import { ILocationsRepository, LocationData } from './locations.repository.interface';

@Injectable()
export class LocationsRepository implements ILocationsRepository {
  constructor(
    @InjectRepository(Location)
    private readonly orm: Repository<Location>,
  ) {}

  private toEntity(data: LocationData): Location {
    return this.orm.create({
      user: { id: data.userId } as Location['user'],
      latitude: data.latitude,
      longitude: data.longitude,
      accuracy: data.accuracy,
      visitedAt: data.visitedAt,
    });
  }

  save(data: LocationData): Promise<Location> {
    return this.orm.save(this.toEntity(data));
  }

  saveMany(data: LocationData[]): Promise<Location[]> {
    return this.orm.save(data.map((d) => this.toEntity(d)));
  }

  findAllForUser(userId: string): Promise<Location[]> {
    return this.orm.find({
      where: { user: { id: userId } },
      order: { visitedAt: 'ASC' },
      select: ['id', 'latitude', 'longitude', 'accuracy', 'visitedAt', 'createdAt'],
    });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.orm.delete({ user: { id: userId } });
  }
}
