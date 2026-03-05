import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsRepository } from './repositories/locations.repository';
import { LOCATIONS_REPOSITORY } from './repositories/locations.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [
    LocationsService,
    { provide: LOCATIONS_REPOSITORY, useClass: LocationsRepository },
  ],
  controllers: [LocationsController],
})
export class LocationsModule {}
