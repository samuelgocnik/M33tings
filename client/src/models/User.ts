export interface IUser {
  id: number;
  name: string;
  picture: string | null;
  createdAt: string;
}

export interface IUserCookie {
  loggedIn: boolean;
  user: IUser | null;
}
