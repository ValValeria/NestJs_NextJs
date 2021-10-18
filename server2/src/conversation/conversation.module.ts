import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './conversation.model';
import { ConversationGateway } from './conversation.gateway';
import { AuthModule } from '../auth/auth.module';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Conversation]),
    AuthModule,
    ResponseModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationGateway],
  exports: [SequelizeModule],
})
export class ConversationModule {}
