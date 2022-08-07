import { CacheModule, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { WsioModule } from './wsio/wsio.module';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    AuthModule,
    WsioModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
