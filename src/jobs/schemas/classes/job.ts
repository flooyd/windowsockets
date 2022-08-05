import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export class Job {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  paid: boolean;

  @Prop({ required: true })
  invoiced: boolean;

  @Prop({ required: true })
  email: string;
}
