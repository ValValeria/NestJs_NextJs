import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {UserModule} from "./user/user.module";
import {User} from "./user/user.model";
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import {ResponseModule} from "./response/response.module";

const providers = [AppService];

@Module({
  imports: [
      UserModule,
      AuthModule,
      ChatModule,
      ResponseModule,
      SequelizeModule.forRoot({
        dialect: 'mysql',
        host: "remotemysql.com",
        port: 3306,
        username: "",
        password: "",
        database: "",
        models: [User],
      })
  ],
  controllers: [AppController],
  providers: [...providers],
  exports: [...providers]
})
export class AppModule {}
