import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConversationService } from './conversation.service';

@WebSocketGateway()
export class ConversationGateway {
  constructor(private conversionService: ConversationService) {}

  @UseGuards(AuthGuard('local'))
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
