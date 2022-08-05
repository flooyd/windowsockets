import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { Job } from './classes/job';

export type ResidentialWindowCleaningDocument = ResidentialWindowCleaning &
  Document;

@Schema()
export class ResidentialWindowCleaning extends Job {
  @Prop()
  numWindows: number;

  @Prop()
  outsideOnly: boolean;

  @Prop()
  notes: string[];
}

export const ResidentialWindowCleaningSchema = SchemaFactory.createForClass(
  ResidentialWindowCleaning,
).index({ email: 1, type: 1 }, { unique: true });
