export interface IStore{
    user: IUser,
    isAuth: boolean
}

export interface IBaseUser{
    username: string,
    password: string,
    id?: number
}

export interface IUser extends IBaseUser{
    email: string;
}