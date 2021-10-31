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
