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
import { blah, add, deleteAll } from 'src/util';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsioGateway {
  constructor(private readonly wsioService: WsioService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('createThing')
  async createThing(@MessageBody() createThingDto: any) {
    console.log(blah);
    add(createThingDto);
    this.server.emit('createThing', createThingDto);
  }

  @SubscribeMessage('findAllThings')
  async findAllThings(client: Socket) {
    await client.emit('findAllThings', blah);
  }

  @SubscribeMessage('deleteThings')
  async deleteThing(@MessageBody() magicNumber: any) {
    if (magicNumber.number !== 77) {
      return {
        event: 'deleteThings',
        data: 'u did not send magic number',
      };
    }

    deleteAll();

    return {
      event: 'deleteThings',
      data: 'things deleted',
    };
  }
}
