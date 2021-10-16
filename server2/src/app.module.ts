import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ResponseModule } from './response/response.module';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/conversation.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import config from './config';

const providers = [AppService];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    ResponseModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.host,
      port: 3306,
      username: config.username,
      password: config.password,
      database: config.database,
      models: [User, Conversation],
    }),
    ConversationModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [...providers],
  exports: [...providers],
})
export class AppModule {}
