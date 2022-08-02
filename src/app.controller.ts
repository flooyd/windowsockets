import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}
  @Get()
  getHello(): string {
    this.logger.log('getHello', AppController.name);
    return this.appService.getHello();
  }
}
