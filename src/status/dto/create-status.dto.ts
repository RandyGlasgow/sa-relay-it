import { IsAlphanumeric, IsNumber, IsOptional } from 'class-validator';
export class CreateStatusDto {
  @IsNumber()
  statusCode: number;

  @IsAlphanumeric()
  name: string;

  @IsAlphanumeric()
  message: string;

  @IsOptional()
  isActive: boolean;
}
