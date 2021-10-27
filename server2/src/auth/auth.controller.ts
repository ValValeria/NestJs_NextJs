import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from '../response/response.service';
import { LoginService } from '../login/login.service';
import { IBaseUser, IUser } from '../interfaces';
import { HttpService } from '@nestjs/axios';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../user/user.model';

@Controller('/api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private response: ResponseService<any>,
    private authService: LoginService,
    private httpService: HttpService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const data = await this.authService.login(request.user as IBaseUser);

    this.response.data = { user: data };

    response.end(JSON.stringify(this.response.data));
  }

  @Post('/signup')
  public async signup(@Req() request: Request, @Res() response: Response) {
    const body = request.body;

    if (request.user) {
      response.status(HttpStatus.BAD_REQUEST).send();
    } else {
      const user = new User();
      user.username = body.username;
      user.password = body.password;
      user.email = body.email;

      const data = await this.authService.validateUser(
        user.username,
        user.password,
      );

      if (!data) {
        await this.authService.createNewUser(user);

        this.httpService.post('/api/auth/login', user).subscribe((v) => {
          response.json(v);
        });
      }
    }
  }
}
