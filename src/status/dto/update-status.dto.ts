import {
  IsAlphanumeric,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
export class UpdateStatusDto {
  @IsOptional()
  @IsNumber()
  statusCode: number;

  @IsOptional()
  @IsAlphanumeric()
  name: string;

  @IsOptional()
  @IsAlphanumeric()
  message: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
