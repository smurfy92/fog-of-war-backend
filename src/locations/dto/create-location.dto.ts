import { IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  @IsOptional()
  accuracy?: number;

  @IsNumber()
  visitedAt: number;
}
