import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema } from 'mongoose';

import { Job } from './classes/job';
import { JobCollection } from './jobCollection.schema';

export type BusinessWindowCleaningDocument = BusinessWindowCleaning & Document;

@NestSchema()
export class BusinessWindowCleaning extends Job {
  @Prop({ required: true })
  numWindows: number;

  @Prop()
  outsideOnly: boolean;

  @Prop()
  notes: string[];
}

export const BusinessWindowCleaningSchema = SchemaFactory.createForClass(
  BusinessWindowCleaning,
).index({ email: 1, type: 1 }, { unique: true });
