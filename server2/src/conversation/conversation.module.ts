import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Conversation} from "./conversation.model";

@Module({
  imports: [SequelizeModule.forFeature([Conversation])],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [SequelizeModule]
})
export class ConversationModule {}
