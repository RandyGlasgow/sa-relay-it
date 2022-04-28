import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
import { serialize, Serialize } from 'src/interceptors/serialize.interceptor';
import { StatusDto } from './dto/status.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getAllStatusCodes() {
    return this.statusService.findAll();
  }

  @Get('/active')
  @Serialize(StatusDto)
  getAllActiveStatusCodes() {
    return this.statusService.findAll({ isActive: true });
  }
  @Get('/:code')
  @Get('/:code/*')
  async getStatusCode(@Res() res, @Param('code') code: string) {
    // test if code is number, regex
    if (!/^\d+$/.test(code)) return new NotFoundException();
    const status = await this.statusService.findOne({
      statusCode: parseInt(code),
      isActive: true,
    });
    return res.status(status.statusCode).send(serialize(StatusDto, status));
  }

  @Get('/:code/delay/:delay*')
  async getStatusCodeWithDelay(
    @Res() res,
    @Param('code') code: string,
    @Param('delay') delay: string,
  ) {
    const regex = /^\d+$/;

    if (!regex.test(code)) throw new NotFoundException('Status code not found');

    // get status code
    const status = await this.statusService.findOne({
      statusCode: parseInt(code),
    });
    // regex to check if delay is a number
    if (!delay || !regex.test(delay)) {
      // if not a number return the status code requested
      return res.status(status.statusCode).send(serialize(StatusDto, status));
    }

    // if delay is a number return the status code requested with delay
    setTimeout(() => {
      return res.status(status.statusCode).send(serialize(StatusDto, status));
    }, parseInt(delay));
  }

  @Post()
  createNewStatusCode(@Body() body: CreateStatusDto) {
    return this.statusService.create(body);
  }

  @Patch('/:code')
  updateStatusCode(@Param('code') code: string, @Body() body: UpdateStatusDto) {
    return this.statusService.update(parseInt(code), body);
  }

  @Delete('/:code')
  deleteStatusCode(@Param('code') code: string) {
    return this.statusService.delete(parseInt(code));
  }
}
