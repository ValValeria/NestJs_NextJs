import { Controller, Get, Header, Query, UseGuards, Req } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoginService } from '../login/login.service';
import { Request } from 'express';

@Controller('conversation')
export class ConversationController {
  constructor(
    private responseService: ResponseService<Conversation[]>,
    private conversationService: ConversationService,
    private authService: LoginService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Header('Content-Type', 'application/json')
  public async getUsers(
    @Query() page: number,
    @Query() per_page: number,
    @Req() request: Request,
  ): Promise<any> {
    return this.conversationService.getMessagesByUser(this.authService.user);
  }
}
