import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  create({ name, message, statusCode, isActive }: CreateStatusDto) {
    const status = this.statusRepo.create({
      name,
      message,
      statusCode,
      isActive,
    });

    return this.statusRepo.save(status);
  }

  async update(statusCode: number, attr: UpdateStatusDto) {
    const status = await this.statusRepo.findOne({ statusCode });

    if (!status) throw new NotFoundException('Status not found');

    Object.assign(status, attr);

    return this.statusRepo.save(status);
  }

  async delete(statusCode: number) {
    const status = await this.statusRepo.findOne({ statusCode });

    if (!status) throw new NotFoundException('Status not found');

    return this.statusRepo.remove(status);
  }

  async findOne(statusCode: number) {
    const status = await this.statusRepo.findOne({ statusCode });

    if (!status) throw new NotFoundException('Status not found');

    return status;
  }

  findAll(attr?: Partial<CreateStatusDto>) {
    console.log(attr);
    return this.statusRepo.find(attr);
  }
}
