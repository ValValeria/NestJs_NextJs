import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './conversation.model';
import { ConversationGateway } from './conversation.gateway';
import { ResponseModule } from '../response/response.module';
import { LoginModule } from '../login/login.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Conversation]),
    LoginModule,
    ResponseModule,
    UserModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationGateway],
  exports: [SequelizeModule],
})
export class ConversationModule {}
