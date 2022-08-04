import { Prop } from '@nestjs/mongoose';

export class Job {
  @Prop({ required: true })
  email: string;
}
