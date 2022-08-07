"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsioGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const wsio_service_1 = require("./wsio.service");
const socket_io_1 = require("socket.io");
let WsioGateway = class WsioGateway {
    constructor(wsioService, cacheManager) {
        this.wsioService = wsioService;
        this.cacheManager = cacheManager;
    }
    async handleConnection(client, ...args) {
        if (!(await this.cacheManager.get('things'))) {
            console.log('xd');
            await this.cacheManager.set('things', [], { ttl: 10000 });
        }
    }
    async createThing(createThingDto) {
        const things = await this.cacheManager.get('things');
        console.log(things);
        await this.cacheManager.set('things', [...things, createThingDto]);
        this.server.emit('createThing', createThingDto);
    }
    async findAllThings(client) {
        console.log('hi');
        let data = await this.cacheManager.get('things');
        await client.emit('findAllThings', data);
    }
    async deleteThing(id) {
        await this.cacheManager.set('things', []);
        return {
            event: 'deleteThings',
            data: 'things deleted',
        };
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WsioGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createThing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WsioGateway.prototype, "createThing", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllThings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WsioGateway.prototype, "findAllThings", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteThings'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WsioGateway.prototype, "deleteThing", null);
WsioGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [wsio_service_1.WsioService, Object])
], WsioGateway);
exports.WsioGateway = WsioGateway;
//# sourceMappingURL=wsio.gateway.js.map