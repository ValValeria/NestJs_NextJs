import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

type func = (err, user) => any;
type userType = {
  id: number;
};

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  deserializeUser(payload: userType, done: func): any {
    done(null, { id: payload.id });
  }

  async serializeUser(user: userType, done: func): Promise<any> {
    const userDb = await this.userService.findById(user.id);
    done(null, userDb);
  }
}
