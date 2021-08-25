import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Conversation} from "./conversation.model";
import {User} from "../user/user.model";

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation)
        private conversationModel: typeof Conversation) {
    }

    async addMessage(message: Conversation): Promise<any>{
        return this.conversationModel.create(message);
    }

    async getMessages(receiver: User, sender: User): Promise<Conversation[]>{
        return this.conversationModel.findAll({
            where: {
                $or: [{userId: receiver.id, receiverId: sender.id}, {userId: sender.id, receiverId: receiver.id}],
            }
        });
    }
}
