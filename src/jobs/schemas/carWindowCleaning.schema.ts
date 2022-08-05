import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { Job } from './classes/job';

export type CarWindowCleaningDocument = CarWindowCleaning & Document;

@Schema()
export class CarWindowCleaning extends Job {
  @Prop()
  outsideOnly: boolean;
}

export const CarWindowCleaningSchema = SchemaFactory.createForClass(
  CarWindowCleaning,
).index({ email: 1, type: 1 }, { unique: true });
