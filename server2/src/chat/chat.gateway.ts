import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {IMessage} from "../interfaces";
import {HttpService} from "@nestjs/axios";

@WebSocketGateway()
export class ChatGateway {
    constructor(private http: HttpService) {
    }

    @SubscribeMessage("message_send")
    handleMessageEvent(@MessageBody() message: IMessage){

    }
}
