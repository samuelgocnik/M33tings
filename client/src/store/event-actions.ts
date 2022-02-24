import Axios from "axios";
import { IEventPostData } from "../models/Event";
import { UiTitles, UiTypes } from "../models/Ui";
import API_URL from "../utils/config";
import { eventActions } from "./event-slice";
import { uiActions } from "./ui-slice";

const { showNotification } = uiActions;

export const createEvent = (data: IEventPostData) => {
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.CreatingEvent,
        message: "",
      })
    );
    try {
      await Axios.post(`${API_URL}events`, {
        ...data,
        address: data.address
          ? {
              street: data.address?.street,
              street_number: data.address?.streetNumber,
              city: data.address?.city,
              country: data.address?.country,
            }
          : null,
      });
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.EventSuccessfullyCreated,
          message: "Event successfully created",
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

export const fetchEvents = () => {
  const { replaceEvents } = eventActions;
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.FetchingEvents,
        message: "",
      })
    );
    try {
      const res = await Axios.get(`${API_URL}events`);
      dispatch(replaceEvents({ events: res.data.result }));
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.EventsSuccessfullyFetched,
          message: "Events successfully fetched",
        })
      );
    } catch (error: any) {
      console.log(error);
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
