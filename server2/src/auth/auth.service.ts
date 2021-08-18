import {Injectable} from "@nestjs/common";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService{
    private _user: User;
    private _isAuthenticated: boolean = false;

    constructor(private userService: UserService) {
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
}