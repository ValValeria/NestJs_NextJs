import {Controller, Get, Header, HttpStatus, Param, Query, Res} from '@nestjs/common';
import {ResponseService} from "../response/response.service";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {chunk} from 'lodash';
import { Response } from 'express';


@Controller('api')
export class UserController {
    constructor(private responseService: ResponseService<User[]>,
                private userService: UserService
    ) {}

    @Get('/users')
    @Header("Content-Type", "application/json")
    public async getUsers(@Query() page: number, @Query() per_page: number): Promise<any> {
        const users = await this.userService.findAll();
        const usersForPage = chunk(users, per_page)[page] || [];

        this.responseService.data = {'users': usersForPage};

        return this.responseService.getResponseJson('password');
    }

    @Get('/user/:id')
    @Header("Content-Type", "application/json")
    public async getUser(@Param('id') id: number,
                         @Res() response: Response): Promise<void> {
        const user = await this.userService.findOne(id);

        if(typeof user === "object" && user){
            this.responseService.data = {'user': [user]};
        } else {
            response.statusCode = HttpStatus.NOT_FOUND;
        }

        response.send(this.responseService.getResponseJson('password'));
    }
}