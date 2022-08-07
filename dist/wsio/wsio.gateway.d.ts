import { OnGatewayConnection } from '@nestjs/websockets';
import { WsioService } from './wsio.service';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
export declare class WsioGateway implements OnGatewayConnection {
    private readonly wsioService;
    private cacheManager;
    constructor(wsioService: WsioService, cacheManager: Cache);
    server: Server;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    createThing(createThingDto: any): Promise<void>;
    findAllThings(client: Socket): Promise<void>;
    deleteThing(id: number): Promise<{
        event: string;
        data: string;
    }>;
}
