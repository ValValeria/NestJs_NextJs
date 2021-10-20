import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ResponseService } from '../response/response.service';
import { LoginService } from '../login/login.service';
import { IBaseUser, IUser } from '../interfaces';
import { HttpService } from '@nestjs/axios';
import { catchError, of } from 'rxjs';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private response: ResponseService<any>,
    private authService: LoginService,
    private httpService: HttpService,
  ) {}

  @Post('/login/')
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
  public async signup(
    @Req() request: Request,
    @Res() response: Response,
    @Body() user: IUser,
  ) {
    if (request.user) {
      response.status(HttpStatus.BAD_REQUEST).send();
    } else {
      const data = await this.authService.validateUser(
        user.username,
        user.password,
      );

      if (!data) {
        await this.authService.createNewUser(user);

        this.httpService
          .post('/api/auth/login', user)
          .pipe(catchError((e) => of()))
          .subscribe((v) => {
            response.json(v);
          });
      }
    }
  }
}
