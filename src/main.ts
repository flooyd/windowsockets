import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import logger, { blah } from 'src/util';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(logger);

  logger.log(`Listening on port ${process.env.PORT}`);

  const cache: Cache = app.get(CACHE_MANAGER);

  await cache.set('things', [], { ttl: 0 });

  console.log(blah);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
