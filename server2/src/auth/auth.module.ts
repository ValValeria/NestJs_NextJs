import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ResponseModule } from '../response/response.module';
import { HttpModule } from '@nestjs/axios';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { SessionSerializer } from './session.serializer';

const modules = [HttpModule];
const exportProviders = [AuthenticatedGuard, AuthService, LocalAuthGuard];

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    ResponseModule,
    ...modules,
  ],
  controllers: [AuthController, LocalStrategy],
  providers: [LocalStrategy, ...exportProviders, SessionSerializer],
  exports: [...modules, ...exportProviders],
})
export class AuthModule {}
