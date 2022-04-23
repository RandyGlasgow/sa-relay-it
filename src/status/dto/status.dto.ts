import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StatusDto {
  @ApiProperty()
  @Expose()
  statusCode: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  message: string;
}
