import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNumber, IsOptional } from 'class-validator';
export class CreateStatusDto {
  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  message: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;
}
