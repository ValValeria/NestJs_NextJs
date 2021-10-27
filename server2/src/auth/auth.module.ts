import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from '../login/login.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ResponseModule } from '../response/response.module';
import { HttpModule } from '@nestjs/axios';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { SessionSerializer } from './session.serializer';
import { LoginModule } from '../login/login.module';

const modules = [HttpModule];
const exportProviders = [LoginService];
const providers = [AuthenticatedGuard, LocalAuthGuard];

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    LoginModule,
    ResponseModule,
    ...modules,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    ...exportProviders,
    SessionSerializer,
    ...providers,
  ],
  exports: [...exportProviders],
})
export class AuthModule {}
