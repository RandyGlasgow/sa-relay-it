import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
export class UpdateStatusDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsOptional()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsAlphanumeric()
  message: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
