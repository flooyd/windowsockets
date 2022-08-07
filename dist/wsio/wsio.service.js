"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsioService = void 0;
const common_1 = require("@nestjs/common");
let WsioService = class WsioService {
    create(createThingDto) {
        return 'This action adds a new wsio';
    }
    findAll() {
        return `This action returns all wsio`;
    }
    findOne(id) {
        return `This action returns a #${id} wsio`;
    }
    update(id, updateWsioDto) {
        return `This action updates a #${id} wsio`;
    }
    remove(id) {
        return `This action removes a #${id} wsio`;
    }
};
WsioService = __decorate([
    (0, common_1.Injectable)()
], WsioService);
exports.WsioService = WsioService;
//# sourceMappingURL=wsio.service.js.map