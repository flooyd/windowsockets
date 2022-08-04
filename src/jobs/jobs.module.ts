import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';

import {
  WindowCleaning,
  WindowCleaningSchema,
} from './schemas/windowcleaning.schema';

@Module({
  providers: [JobsGateway, JobsService, Logger],
  imports: [
    MongooseModule.forFeature([
      { name: WindowCleaning.name, schema: WindowCleaningSchema },
    ]),
  ],
})
export class JobsModule {}
