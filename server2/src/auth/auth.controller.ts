import {Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {AuthGuard} from "@nestjs/passport";
import {ResponseService} from "../response/response.service";
import {User} from "../user/user.model";

@Controller('auth')
export class AuthController {
    constructor(private response: ResponseService<any>) {}

    @Post('/login/')
    @UseGuards(AuthGuard('local'))
    public login(@Res() response: Response,
                 @Req() request: Request): void{
      this.response.data = {"user": request.user};
    }
}
