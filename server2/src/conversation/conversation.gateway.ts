import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConversationService } from './conversation.service';
import { IMessage, IUser } from '../interfaces';
import { ResponseService } from '../response/response.service';
import { LoginService } from '../login/login.service';
import { Conversation } from './conversation.model';
import { UserService } from '../user/user.service';
import moment from 'moment';
import { Socket, Server } from 'socket.io';
import _ from 'lodash';

type sockets = { user: IUser; socketId: string }[];

@WebSocketGateway()
export class ConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger(ConversationGateway.name);
  private readonly connectedUsers: sockets = [];

  constructor(
    private conversionService: ConversationService,
    private responseService: ResponseService<any>,
    private authService: LoginService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @SubscribeMessage('connectUser')
  async addNewUser(@ConnectedSocket() client: Socket): Promise<any> {
    this.connectedUsers.push({
      socketId: client.id,
      user: this.authService.user,
    });
  }

  @UseGuards(AuthGuard('local'))
  @SubscribeMessage('message')
  async handleEvent(
    @MessageBody() data: IMessage,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const receiver = await this.userService.findById(data.receiver_id);

    if (data.sender_id !== this.authService.user.id || !receiver) {
      this.responseService.errors.push('Invalid credentials');
      throw new WsException(this.responseService);
    }

    const time = moment(Date.now()).format('DD/MM/YYYY h:mm:ss');
    const conversion: Conversation = new Conversation();
    conversion.message = data.message;
    conversion.receiver = receiver;
    conversion.sender = this.authService.user;
    conversion.receiverId = receiver.id;
    conversion.senderId = this.authService.user.id;
    conversion.createdAt = time;
    conversion.updatedAt = time;

    await this.conversionService.addMessage(conversion);

    const receiverSocket = this.connectedUsers.find(
      (v) => v.user.id === receiver.id,
    );

    if (receiverSocket) {
      this.server.sockets.sockets
        .get(receiverSocket.socketId)
        .emit('newMessage');
      this.responseService.status = 'ok';
    }

    return this.responseService;
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    const id = client.id;

    _.remove(this.connectedUsers, (item) => {
      return id === item.socketId;
    });

    this.logger.log(`Client disconnected: ${id}`);
  }
}
