import Axios from "axios";
import { IEventPostData } from "../models/Event";
import {
  IParticipantDelete,
  IParticipantPost,
  IParticipantUpdate,
} from "../models/Participant";
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

export const fetchEvents = (
  replace: boolean,
  limit: number = 5,
  offset: number = 0
) => {
  const { replaceEvents, addEvents } = eventActions;

  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.FetchingEvents,
        message: "",
      })
    );
    try {
      console.log("fetching events -> offset -> ", offset);
      const res = await Axios.get(`${API_URL}events`, {
        params: { limit, offset },
      });
      if (replace) {
        dispatch(replaceEvents({ events: res.data.result }));
      } else if (res.data.result.length === 0) {
        dispatch(
          showNotification({
            type: UiTypes.Success,
            title: UiTitles.NoMoreEventsToFetch,
            message: "All events already fetched",
          })
        );
      } else {
        dispatch(addEvents({ events: res.data.result }));
      }
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

export const addParticipantToEvent = (data: IParticipantPost, name: string) => {
  const { addParticipant } = eventActions;
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.EditingEventParticipant,
        message: "",
      })
    );
    try {
      const res = await Axios.post(`${API_URL}participant`, {
        user_id: data.userId,
        event_id: data.eventId,
        going: data.going,
      });
      dispatch(
        addParticipant({
          eventId: data.eventId,
          participant: {
            id: res.data.id,
            userId: res.data.user_id,
            going: res.data.going,
            name,
          },
        })
      );
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.EventParticipantSuccessfullyEdited,
          message: "Event participant succesfully created",
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

export const updateEventParticipant = (
  data: IParticipantUpdate,
  eventId: number
) => {
  const { updateParticipant } = eventActions;
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.EditingEventParticipant,
        message: "",
      })
    );
    try {
      await Axios.put(`${API_URL}participant`, data);
      dispatch(
        updateParticipant({
          eventId,
          participantId: data.id,
          going: data.going,
        })
      );
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.EventParticipantSuccessfullyEdited,
          message: "Event participant succesfully updated",
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

export const deleteEventParticipant = (
  data: IParticipantDelete,
  eventId: number
) => {
  const { removeParticipant } = eventActions;
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        type: UiTypes.Loading,
        title: UiTitles.EditingEventParticipant,
        message: "",
      })
    );
    try {
      const config = { data: { id: data.id } };
      await Axios.delete(`${API_URL}participant`, config);
      dispatch(
        removeParticipant({
          eventId: eventId,
          participantId: data.id,
        })
      );
      dispatch(
        showNotification({
          type: UiTypes.Success,
          title: UiTitles.EventParticipantSuccessfullyEdited,
          message: "Event participant succesfully deleted",
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
