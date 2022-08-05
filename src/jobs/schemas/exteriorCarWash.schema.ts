import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { Job } from './classes/job';

export type ExteriorCarWashDocument = ExteriorCarWash & Document;

@Schema()
export class ExteriorCarWash extends Job {
  @Prop()
  outsideOnly: boolean;
}

export const ExteriorCarWashSchema = SchemaFactory.createForClass(
  ExteriorCarWash,
).index({ email: 1, type: 1 }, { unique: true });
