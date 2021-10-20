import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { User } from './user.model';
import { UserService } from './user.service';
import { chunk } from 'lodash';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { copyFile } from 'fs/promises';
import { IUser } from '../interfaces';

@Controller('api')
export class UserController {
  constructor(
    private responseService: ResponseService<User[]>,
    private userService: UserService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/users')
  @Header('Content-Type', 'application/json')
  public async getUsers(
    @Query() page: number,
    @Query() per_page: number,
  ): Promise<any> {
    const users = await this.userService.findAll();
    const usersForPage = chunk(users, per_page)[page] || [];

    this.responseService.data = { users: usersForPage };

    return this.responseService.getResponseJson('password');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/user/:id')
  @Header('Content-Type', 'application/json')
  public async getUser(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    const user = await this.userService.findOne(id);

    if (typeof user === 'object' && user) {
      this.responseService.data = { user: [user] };
    } else {
      response.statusCode = HttpStatus.NOT_FOUND;
    }

    response.send(this.responseService.getResponseJson('password'));
  }

  @UseGuards(AuthenticatedGuard)
  @Put('/user/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  @Header('Content-Type', 'application/json')
  public async changeAvatar(
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Param() id: number,
  ): Promise<void> {
    if (file.mimetype.startsWith('image/') && file.size < Math.pow(10, 4)) {
      const user = request.user as IUser;

      if (user.id === id) {
        const filename = Math.round(Math.random() * 1000) + file.filename;
        const destPath = path.join(__dirname, '...', 'public', filename);
        const userToChange = await this.userService.findById(id);

        if (!userToChange) {
          throw new NotFoundException();
        }

        userToChange.image = `/images/${filename}`;
        await Promise.all([copyFile(file.path, destPath), userToChange.save()]);
      } else {
        throw new ForbiddenException();
      }

      response.json(this.responseService);
    } else {
      throw new BadRequestException();
    }
  }
}
