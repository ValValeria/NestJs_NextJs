import { Controller, Get, Header, Query, Req, UseGuards } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoginService } from '../login/login.service';
import { Request } from 'express';
import { IUser } from '../interfaces';
import { UserService } from '../user/user.service';

@Controller('conversation')
export class ConversationController {
  constructor(
    private responseService: ResponseService<Conversation[]>,
    private conversationService: ConversationService,
    private authService: LoginService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Header('Content-Type', 'application/json')
  public async getUsers(
    @Query() page: number,
    @Query() per_page: number,
    @Req() request: Request,
  ): Promise<any> {
    const messages = await this.conversationService.getMessagesByUser(
      this.authService.user,
    );

    return await Promise.all(
      messages
        .map(async (v) => {
          const receiverUser = await this.userService.findById(v.receiverId);
          const senderUser = await this.userService.findById(v.senderId);
          let user: Partial<IUser>;

          if (
            receiverUser?.username !== this.authService.user.username &&
            receiverUser
          ) {
            user = { id: receiverUser.id, username: receiverUser.username };
          }

          if (
            senderUser?.username !== this.authService.user.username &&
            senderUser
          ) {
            user = { id: senderUser.id, username: senderUser.username };
          }

          return user;
        })
        .filter((v) => v),
    );
  }
}
