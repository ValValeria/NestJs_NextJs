import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { IBaseUser, IUser } from '../interfaces';

@Injectable()
export class LoginService {
  private _user: User;
  private _isAuthenticated = false;

  constructor(private userService: UserService) {}

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
    this._isAuthenticated = true;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === pass) {
      this.user = user;

      return user;
    }

    return null;
  }

  async login(user: IBaseUser) {
    const payload = { username: user.username, id: user.id };

    return {
      ...payload,
    };
  }

  async createNewUser(user: IUser) {
    this.user = new User();
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.username = user.username;

    return this.userService.create(this.user);
  }
}
