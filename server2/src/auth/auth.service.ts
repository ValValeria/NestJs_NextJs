import {Injectable} from "@nestjs/common";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import {IBaseUser, IUser} from "../interfaces";


@Injectable()
export class AuthService{
    private _user: User;
    private _isAuthenticated: boolean = false;

    constructor(private userService: UserService,
                private jwtService: JwtService
                ) {
    }

    get user(): User{
        return this._user;
    }

    set user(value: User) {
        this._user = value;
        this._isAuthenticated = true;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.userService.findByUsername(username);

        if(user && user.password === pass){
            return user;
        }

        return null;
    }

    async login(user: IBaseUser){
        const payload = { username: user.username, id: user.id };

        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async createNewUser(user: IUser){
        this.user = new User();
        this.user.email = user.email;
        this.user.password = user.password;
        this.user.username = user.username;

        return this.userService.create(this.user);
    }
}