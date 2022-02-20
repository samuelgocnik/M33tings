import Axios from "axios";
import { IEventPostData } from "../models/Event";
import { UiTypes } from "../models/Ui";
import API_URL from "../utils/config";
import { eventActions } from "./event-slice";
import { uiActions } from "./ui-slice";

const { showNotification } = uiActions;

export const createEvent = (data: IEventPostData) => {
  return async (dispatch: any) => {
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

export const fetchEvents = () => {
  const { replaceEvents } = eventActions;
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: "",
        message: "",
      })
    );
    try {
      const res = await Axios.get(`${API_URL}events`);
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
      dispatch(replaceEvents({ events: res.data.result }));
      // dispatch(
      //   showNotification({
      //     type: UiTypes.Success,
      //     title: "Events fetch",
      //     message: "Events successfully fetched",
      //   })
      // );
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
