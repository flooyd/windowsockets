import {
  CacheInterceptor,
  CACHE_MANAGER,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsioService } from './wsio.service';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsioGateway implements OnGatewayConnection {
  constructor(
    private readonly wsioService: WsioService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    if (!(await this.cacheManager.get('things'))) {
      console.log('xd');
      await this.cacheManager.set('things', [], { ttl: 10000 });
    }
  }

  @SubscribeMessage('createThing')
  async createThing(@MessageBody() createThingDto: any) {
    const things: [] = await this.cacheManager.get('things');
    console.log(things);
    await this.cacheManager.set('things', [...things, createThingDto]);
    this.server.emit('createThing', createThingDto);
  }

  @SubscribeMessage('findAllThings')
  async findAllThings(client: Socket) {
    console.log('hi');
    let data = await this.cacheManager.get('things');
    await client.emit('findAllThings', data);
  }

  @SubscribeMessage('deleteThings')
  async deleteThing(@MessageBody() id: number) {
    await this.cacheManager.set('things', []);
    return {
      event: 'deleteThings',
      data: 'things deleted',
    };
  }
}
