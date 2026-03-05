import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class BulkCreateLocationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  locations: CreateLocationDto[];
}
