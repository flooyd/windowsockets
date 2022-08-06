import { PartialType } from '@nestjs/mapped-types';
import { CreateThingDto } from './createThing.dto';

export class UpdateWsioDto extends PartialType(CreateThingDto) {
  id: number;
}
