import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {ResponseService} from "../response/response.service";
import {ResponseModule} from "../response/response.module";
import {HttpModule} from "@nestjs/axios";

const modules = [HttpModule];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
    UserModule,
    ResponseModule,
    ...modules
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, ...modules]
})
export class AuthModule {}
