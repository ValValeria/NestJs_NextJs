import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/conversation.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config';
import * as path from 'path';

const providers = [AppService];
const modules = [UserModule, ResponseModule, ConversationModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.host,
      port: 3306,
      username: config.username,
      password: config.password,
      database: config.database,
      models: [User, Conversation],
    }),
    EventEmitterModule.forRoot(),
    ...modules,
  ],
  controllers: [],
  providers: [...providers],
  exports: [...providers],
})
export class AppModule {}
