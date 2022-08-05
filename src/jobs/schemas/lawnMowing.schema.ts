import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { Job } from './classes/job';

export type LawnMowingDocument = LawnMowing & Document;

@Schema()
export class LawnMowing extends Job {
  @Prop()
  width: number;

  @Prop()
  height: number;
}

export const LawnMowingSchema = SchemaFactory.createForClass(LawnMowing).index(
  { email: 1, type: 1 },
  { unique: true },
);
