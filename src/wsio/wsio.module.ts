import { CacheModule, Module } from '@nestjs/common';
import { WsioService } from './wsio.service';
import { WsioGateway } from './wsio.gateway';

@Module({
  providers: [WsioGateway, WsioService],
  imports: [CacheModule.register()],
})
export class WsioModule {}
