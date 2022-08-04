import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from './classes/job';

export type WindowCleaningDocument = WindowCleaning & Document;

@Schema()
export class WindowCleaning extends Job {
  @Prop()
  numWindows: number;

  @Prop({ MIN_VALUE: 20 })
  price: number;
}

export const WindowCleaningSchema = SchemaFactory.createForClass(
  WindowCleaning,
).index({ email: 1, numWindows: 1 }, { unique: true });
