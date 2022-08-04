import { Logger, Module } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';
import {
  WindowCleaning,
  WindowCleaningSchema,
} from './schemas/windowcleaning.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [JobsGateway, JobsService, Logger],
  imports: [
    MongooseModule.forFeature([
      { name: WindowCleaning.name, schema: WindowCleaningSchema },
    ]),
  ],
})
export class JobsModule {}
