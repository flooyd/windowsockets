import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

import logger from 'src/util';

@Catch(WsException, HttpException)
export class WebSocketExceptionsFilter extends BaseWsExceptionFilter {
  constructor(private executingMethod: String) {
    super();
  }

  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as WebSocket;
    const data = host.switchToWs().getData();
    console.log(data);
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };
    logger.log(
      'Exception: ' +
        JSON.stringify({
          clientHeaders: client['handshake'].headers,
          error: details,
          message: details.message,
        }),
      WebSocketExceptionsFilter.name,
    );
    client.send(
      JSON.stringify({
        ...details,
      }),
    );
  }
}
