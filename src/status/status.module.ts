import { Module, NotFoundException } from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { Repository } from 'typeorm/repository/Repository';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [TypeOrmModule.forFeature([Status])],
})
export class StatusModule {
  constructor(private readonly statusService: StatusService) {}
  async onModuleInit() {
    // read in the default status codes from the file
    const codes = require('../../default_status_codes.json');

    // checks
    if (!codes || codes.length === 0) return;

    // create the status codes
    codes.forEach((code: CreateStatusDto) => {
      const { name, message, statusCode, isActive } = code;

      // check if the status code already exists
      const existing = this.statusService.findOne(statusCode).catch((err) => {
        // create the status code
        this.statusService.create({
          name,
          message,
          statusCode,
          isActive,
        });
      });
    });
  }
}
