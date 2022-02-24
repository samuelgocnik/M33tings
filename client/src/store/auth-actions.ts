import Axios from "axios";
import { UiTitles, UiTypes } from "../models/Ui";
import API_URL from "../utils/config";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";

const { showNotification } = uiActions;

const retrieveToken = (): string | null => {
  const token = localStorage.getItem("token");
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
        headers: { Authorization: `Bearer ${initialToken}` },
      };
      await Axios.get(`${API_URL}users/login`, config).then((res) => {
        if (res.data.message) {
          dispatch(authActions.logout());
          return;
        } else if (res.data.user) {
          dispatch(
            authActions.login({ user: res.data.user, token: initialToken })
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (name: string, pwd: string) => {
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.Login,
        message: "",
      })
    );
    try {
      const res = await Axios.post(`${API_URL}users/login`, { name, pwd });
      localStorage.setItem("token", res.data.token || "Invalid token");
      dispatch(
        authActions.login({ user: res.data.user, token: res.data.token })
      );
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.SuccessfullyLoggedIn,
          message: "",
        })
      );
    } catch (error: any) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: UiTitles.None,
          message: error.response.data.message || "Network error",
        })
      );
    }
  };
};

export const registerUser = (name: string, pwd: string) => {
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.Registration,
        message: "",
      })
    );
    try {
      await Axios.post(`${API_URL}users/register`, {
        name,
        pwd,
      });
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.SuccessfullyRegistered,
          message: `User ${name} successfully registered`,
        })
      );
    } catch (error: any) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: UiTitles.None,
          message: error.response.data.message || "Network error",
        })
      );
    }
  };
};
