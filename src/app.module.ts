import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [JobsModule, MongooseModule.forRoot('mongodb://localhost/gigs'), AuthModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
