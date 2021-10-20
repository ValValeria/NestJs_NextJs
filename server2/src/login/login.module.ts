import { LoginService } from './login.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
