import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { BulkCreateLocationDto } from './dto/bulk-create-location.dto';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // POST /api/locations — add a single location
  @Post()
  addOne(@Request() req, @Body() dto: CreateLocationDto) {
    return this.locationsService.addOne(req.user.id, dto);
  }

  // POST /api/locations/bulk — add multiple locations at once
  @Post('bulk')
  addBulk(@Request() req, @Body() dto: BulkCreateLocationDto) {
    return this.locationsService.addBulk(req.user.id, dto.locations);
  }

  // GET /api/locations — get all locations for current user
  @Get()
  findAll(@Request() req) {
    return this.locationsService.findAllForUser(req.user.id);
  }

  // DELETE /api/locations — clear all locations for current user
  @Delete()
  deleteAll(@Request() req) {
    return this.locationsService.deleteAllForUser(req.user.id);
  }
}
