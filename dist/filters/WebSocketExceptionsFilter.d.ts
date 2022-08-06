import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
export declare class WebSocketExceptionsFilter extends BaseWsExceptionFilter {
    private executingMethod;
    constructor(executingMethod: String);
    catch(exception: WsException | HttpException, host: ArgumentsHost): void;
}
