import Axios from "axios";
import { IEventPostData } from "../models/Event";
import { UiTypes } from "../models/Ui";
import API_URL from "../utils/config";
import { uiActions } from "./ui-slice";

export const createEvent = (data: IEventPostData) => {
  return async (dispatch: any) => {
    const { showNotification } = uiActions;
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: "",
        message: "",
      })
    );
    try {
      const res = await Axios.post(`${API_URL}events`, data);
      if (res.data.message) {
        dispatch(
          showNotification({
            type: UiTypes.Error,
            title: "Error",
            message: res.data.message,
          })
        );
        return;
      }
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: "event cration",
          message: "Event successfully created",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          type: UiTypes.Error,
          title: "Error",
          message: "Network error",
        })
      );
      console.error(error);
    }
  };
};
