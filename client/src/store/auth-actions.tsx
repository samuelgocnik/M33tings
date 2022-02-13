import Axios from "axios";
import API_URL from "../utils/config";
import { authActions } from "./auth-slice";

const retrieveToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};

export const initializeUser = () => {
  return async (dispatch: any) => {
    const initialToken: string | null = retrieveToken();
    if (!initialToken) {
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${initialToken}` }
      };
      await Axios.get(`${API_URL}users/login`, config).then((res) => {
        if (res.data) {
          dispatch(authActions.login({ user: res.data.user, token: initialToken }));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}