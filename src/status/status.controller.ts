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

  @Post()
  createNewStatusCode(@Body() body: CreateStatusDto) {
    return this.statusService.create(body);
  }

  @Get('/:code/*')
  @ApiResponse({
    description: 'will return a status code based on the code provided',
  })
  async getStatusCode(@Param('code') code: string, @Res() res) {
    // get the desired status code
    const obj = await this.statusService.findOne(parseInt(code));

    if (!obj.isActive) throw new NotFoundException('Status code not found');

    // return a not available status code
    return res.status(obj.statusCode).send(serialize(StatusDto, obj));
  }

  @Get('/:delay/:code/')
  @ApiResponse({
    description:
      'will return a delayed response of type status code based on the code provided',
  })
  async getStatusCodeWithDelay(
    @Param('delay') delay: string,
    @Param('code') code: string,
    @Res() res,
  ) {
    // get the status code
    const obj = await this.statusService.findOne(parseInt(code));

    if (!obj.isActive) throw new NotFoundException('Status code not found');
    // if the status code is active
    // return the status code as the response with a delay

    const timer = setTimeout(() => {
      res.status(obj.statusCode).send(serialize(StatusDto, obj));
    }, parseInt(delay));
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
