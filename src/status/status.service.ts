import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async create({ name, message, statusCode, isActive }: CreateStatusDto) {
    // check if status code already exists
    const status = await this.statusRepo.findOne({ statusCode });

    if (status) throw new UnauthorizedException('Status code already exists');

    const newStatus = this.statusRepo.create({
      name,
      message,
      statusCode,
      isActive,
    });

    return this.statusRepo.save(newStatus);
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

  async findOne(attr: Partial<CreateStatusDto>) {
    const status = await this.statusRepo.findOne({ ...attr });

    if (!status) throw new NotFoundException('Status not found');

    return status;
  }

  async findAll(attr?: Partial<CreateStatusDto>) {
    return this.statusRepo.find(attr);
  }
}
