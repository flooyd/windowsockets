import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WsioService } from './wsio.service';

@WebSocketGateway()
export class WsioGateway {
  private things = [];
  constructor(private readonly wsioService: WsioService) {}

  @SubscribeMessage('createThing')
  create(@MessageBody() createThingDto: any) {
    this.things.push[createThingDto];
    return {
      event: 'createThing',
      data: 'thing created',
    };
  }

  @SubscribeMessage('findAllThings')
  findAll() {
    return {
      event: 'findAllThings',
      data: this.things,
    };
  }

  @SubscribeMessage('deleteThings')
  remove(@MessageBody() id: number) {
    this.things = [];
    return {
      event: 'deleteThings',
      data: 'things deleted',
    };
  }
}
