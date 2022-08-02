import { Logger, Module } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';

@Module({
  providers: [JobsGateway, JobsService, Logger],
})
export class JobsModule {}
