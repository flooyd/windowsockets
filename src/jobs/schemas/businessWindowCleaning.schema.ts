import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { Job } from './classes/job';

export type BusinessWindowCleaningDocument = BusinessWindowCleaning & Document;

@Schema()
export class BusinessWindowCleaning extends Job {
  @Prop()
  numWindows: number;

  @Prop()
  outsideOnly: boolean;

  @Prop()
  notes: string[];
}

export const BusinessWindowCleaningSchema = SchemaFactory.createForClass(
  BusinessWindowCleaning,
).index({ email: 1, type: 1 }, { unique: true });
