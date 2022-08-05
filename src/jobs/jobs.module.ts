import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';

import {
  ResidentialWindowCleaning,
  ResidentialWindowCleaningSchema,
} from './schemas/residentialWindowCleaning.schema';

@Module({
  providers: [JobsGateway, JobsService, Logger],
  imports: [
    MongooseModule.forFeature([
      {
        name: ResidentialWindowCleaning.name,
        schema: ResidentialWindowCleaningSchema,
      },
    ]),
  ],
})
export class JobsModule {}
