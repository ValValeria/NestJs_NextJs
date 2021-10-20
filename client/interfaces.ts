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

export interface IResponse<T>{
    data: { [prop: string]: T };
    status: 'ok' | 'bad';
    messages: string[];
    errors: string[];
}

export interface IUserResponse extends IResponse<IUser[]>{
    data: {user: IUser[]}
}
