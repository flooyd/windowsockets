import { Injectable } from '@nestjs/common';
import { CreateThingDto } from './dto/createThing.dto';
import { UpdateWsioDto } from './dto/update-wsio.dto';

@Injectable()
export class WsioService {
  create(createThingDto: CreateThingDto) {
    return 'This action adds a new wsio';
  }

  findAll() {
    return `This action returns all wsio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wsio`;
  }

  update(id: number, updateWsioDto: UpdateWsioDto) {
    return `This action updates a #${id} wsio`;
  }

  remove(id: number) {
    return `This action removes a #${id} wsio`;
  }
}
