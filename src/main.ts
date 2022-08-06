import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import logger from 'src/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(logger);

  logger.log(`Listening on port ${process.env.PORT}`);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
