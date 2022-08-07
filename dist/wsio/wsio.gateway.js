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
const websockets_1 = require("@nestjs/websockets");
const wsio_service_1 = require("./wsio.service");
const socket_io_1 = require("socket.io");
const util_1 = require("../util");
let WsioGateway = class WsioGateway {
    constructor(wsioService) {
        this.wsioService = wsioService;
    }
    async createThing(createThingDto) {
        console.log(util_1.blah);
        (0, util_1.add)(createThingDto);
        await this.server.emit('createThing', createThingDto);
    }
    async findAllThings(client) {
        await this.server.emit('findAllThings', util_1.blah.length === 0 ? { message: 'no things found' } : util_1.blah);
    }
    async deleteThings(client) {
        console.log('hi');
        (0, util_1.deleteAll)();
        await this.server.emit('deleteThings', {
            message: 'things have been deleted',
        });
        console.log('hi');
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WsioGateway.prototype, "deleteThings", null);
WsioGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [wsio_service_1.WsioService])
], WsioGateway);
exports.WsioGateway = WsioGateway;
//# sourceMappingURL=wsio.gateway.js.map