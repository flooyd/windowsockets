import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Model, Schema } from 'mongoose';
import { BusinessWindowCleaning } from './businessWindowCleaning.schema';
import { ResidentialWindowCleaning } from './residentialWindowCleaning.schema';
export type JobCollectionDocument = JobCollection & Document;

@NestSchema()
export class JobCollection {
  @Prop({ required: true })
  email: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'BusinessWindowCleaning' })
  business: BusinessWindowCleaning;

  @Prop({ type: Schema.Types.ObjectId, ref: 'ResidentialWindowCleaning' })
  residential: ResidentialWindowCleaning;
}

export const JobCollectionSchema = SchemaFactory.createForClass(
  JobCollection,
).index({ email: 1 }, { unique: true });
