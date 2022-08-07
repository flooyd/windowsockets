import { WsioService } from './wsio.service';
import { Server, Socket } from 'socket.io';
export declare class WsioGateway {
    private readonly wsioService;
    constructor(wsioService: WsioService);
    server: Server;
    createThing(createThingDto: any): Promise<void>;
    findAllThings(client: Socket): Promise<void>;
    deleteThings(client: Socket): Promise<void>;
}
