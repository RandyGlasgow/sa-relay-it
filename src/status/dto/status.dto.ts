import { Expose } from 'class-transformer';

export class StatusDto {
  @Expose()
  statusCode: number;

  @Expose()
  name: string;

  @Expose()
  message: string;
}
