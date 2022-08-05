import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';

import {
  ResidentialWindowCleaning,
  ResidentialWindowCleaningSchema,
} from './schemas/residentialWindowCleaning.schema';
import {
  JobCollection,
  JobCollectionSchema,
} from './schemas/jobCollection.schema';
import {
  BusinessWindowCleaning,
  BusinessWindowCleaningSchema,
} from './schemas/businessWindowCleaning.schema';

@Module({
  providers: [JobsGateway, JobsService, Logger],
  imports: [
    MongooseModule.forFeature([
      {
        name: JobCollection.name,
        schema: JobCollectionSchema,
      },
      {
        name: ResidentialWindowCleaning.name,
        schema: ResidentialWindowCleaningSchema,
      },
      {
        name: BusinessWindowCleaning.name,
        schema: BusinessWindowCleaningSchema,
      },
    ]),
  ],
})
export class JobsModule {}
