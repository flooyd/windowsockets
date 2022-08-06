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
var WebSocketExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const util_1 = require("../util");
let WebSocketExceptionsFilter = WebSocketExceptionsFilter_1 = class WebSocketExceptionsFilter extends websockets_1.BaseWsExceptionFilter {
    constructor(executingMethod) {
        super();
        this.executingMethod = executingMethod;
    }
    catch(exception, host) {
        const client = host.switchToWs().getClient();
        const data = host.switchToWs().getData();
        console.log(data);
        const error = exception instanceof websockets_1.WsException
            ? exception.getError()
            : exception.getResponse();
        const details = error instanceof Object ? Object.assign({}, error) : { message: error };
        util_1.default.log('Exception: ' +
            JSON.stringify({
                clientHeaders: client['handshake'].headers,
                error: details,
                message: details.message,
            }), WebSocketExceptionsFilter_1.name);
        client.send(JSON.stringify(Object.assign({}, details)));
    }
};
WebSocketExceptionsFilter = WebSocketExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)(websockets_1.WsException, common_1.HttpException),
    __metadata("design:paramtypes", [String])
], WebSocketExceptionsFilter);
exports.WebSocketExceptionsFilter = WebSocketExceptionsFilter;
//# sourceMappingURL=WebSocketExceptionsFilter.js.map