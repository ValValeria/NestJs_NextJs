import {IUser} from "./interfaces";

export enum Permissions{
    DELETE_ACCOUNT,
    WRITE_MESSAGE,
    VIEW_ACCOUNT,
}

export function hasPermission(authData: IUser, user: IUser, perm: Permissions){
    switch (perm) {
        case Permissions.DELETE_ACCOUNT:
            return authData.id === user.id;
        case Permissions.VIEW_ACCOUNT:
            return authData.username.length > 0;
        default:
            return false
    }
}

export class UserModel implements IUser{
    private _id: number;
    private _password: string;
    private _username: string;
    private _email: string;

    constructor() {
        this._id = 0;
        this._username = "Unknown";
        this._password = "";
        this._email = "";
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }
}
