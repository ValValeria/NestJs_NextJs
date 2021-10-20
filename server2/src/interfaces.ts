export interface IBaseUser {
  username: string;
  password: string;
  id?: number;
}

export interface IUser extends IBaseUser {
  email: string;
}

export interface IMessage {
  id?: number;
  message: string;
  receiver_id: number;
  sender_id: number;
  date: string
}

