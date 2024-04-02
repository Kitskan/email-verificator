import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class GatewayService {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('email_event')
  public handleEvent(@MessageBody() data: string): string {
    return data;
  }

  public sendToClient(message: string): void {
    this.server.emit('email_event', message);
  }
}
