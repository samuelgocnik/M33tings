export interface IUser {
  id: number;
  name: string;
  picture: string | null;
  createdAt: string;
}

export interface IUserCookie {
  token: string | null;
  user: IUser | null;
}
