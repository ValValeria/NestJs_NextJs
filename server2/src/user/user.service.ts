import {Injectable} from "@nestjs/common";
import {InjectModel} from '@nestjs/sequelize';
import {User} from "./user.model";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: number): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async create(user: User): Promise<User>{
        return this.userModel.create(user);
    }

    async findByEmail(email: string): Promise<User>{
        return this.userModel.findOne({where: {email: {email}}});
    }

    async findByUsername(username: string): Promise<User>{
        return this.userModel.findOne({where: {username: {username}}});
    }
}