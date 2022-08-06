import { Module } from '@nestjs/common';
import { WsioService } from './wsio.service';
import { WsioGateway } from './wsio.gateway';

@Module({
  providers: [WsioGateway, WsioService]
})
export class WsioModule {}
