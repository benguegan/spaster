export interface IUserData {
  userId: number;
  username: string;
  password: string;
}

export interface IUserRO {
  user: IUserData;
}

export type UserDTO = any;
