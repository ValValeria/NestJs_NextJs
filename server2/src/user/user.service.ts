import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: User,
  ) {}

  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  findOne(id: number): Promise<User> {
    return User.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: User): Promise<User> {
    return User.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    return User.findOne({ where: { email: { email } } });
  }

  async findByUsername(username: string): Promise<User> {
    return User.findOne({ where: { username: { username } } });
  }

  async findById(id: number){
    return User.findByPk(id);
  }
}
