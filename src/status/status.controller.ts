import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
import { serialize, Serialize } from 'src/interceptors/serialize.interceptor';
import { StatusDto } from './dto/status.dto';

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

  @Get('/:code')
  async getStatusCode(@Param('code') code: string, @Res() res) {
    // get the desired status code
    const obj = await this.statusService.findOne(parseInt(code));

    // return the status code as the response
    return res.status(obj.statusCode).send(serialize(StatusDto, obj));
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
