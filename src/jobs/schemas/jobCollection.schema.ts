import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

export type JobCollectionDocument = JobCollection & Document;

@Schema()
export class JobCollection {
  @Prop({ required: true })
  email: string;

  @Prop()
  jobs: object[];
}

export const JobCollectionSchema = SchemaFactory.createForClass(
  JobCollection,
).index({ email: 1 }, { unique: true });
