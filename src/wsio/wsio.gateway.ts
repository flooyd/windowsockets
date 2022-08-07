import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsioService } from './wsio.service';
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
    await this.server.emit('createThing', createThingDto);
  }

  @SubscribeMessage('findAllThings')
  async findAllThings(client: Socket) {
    await this.server.emit(
      'findAllThings',
      blah.length === 0 ? { message: 'no things found' } : blah,
    );
  }

  @SubscribeMessage('deleteThings')
  async deleteThings(client: Socket) {
    console.log('hi');
    deleteAll();

    await this.server.emit('deleteThings', {
      message: 'things have been deleted',
    });
    console.log('hi');
  }
}
