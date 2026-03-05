import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { BulkCreateLocationDto } from './dto/bulk-create-location.dto';
import { AuthenticatedRequest } from '../common/types/authenticated-request.interface';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  addOne(@Req() req: AuthenticatedRequest, @Body() dto: CreateLocationDto) {
    return this.locationsService.addOne(req.user.id, dto);
  }

  @Post('bulk')
  addBulk(@Req() req: AuthenticatedRequest, @Body() dto: BulkCreateLocationDto) {
    return this.locationsService.addBulk(req.user.id, dto.locations);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.locationsService.findAllForUser(req.user.id);
  }

  @Delete()
  deleteAll(@Req() req: AuthenticatedRequest) {
    return this.locationsService.deleteAllForUser(req.user.id);
  }
}
