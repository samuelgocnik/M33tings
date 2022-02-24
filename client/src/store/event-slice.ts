import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IEvent, IEventStore } from "../models/Event";

type RootState = IEventStore;

const transformData = (events: any): IEvent[] => {
  return events.map((x: any) => {
    // only change naming convention to camelCase
    let address = null;
    if (x.address) {
      address = {
        id: x.address.id,
        eventId: x.address.event_id,
        street: x.address.street,
        streetNumber: x.address.street_number,
        city: x.address.city,
        country: x.address.country,
        createdAt: x.address.created_at,
      };
    }
    const allParticipants = x.all_participants
      ? x.all_participants.map((tmp: any) => ({
          id: tmp.id,
          userId: tmp.user_id,
          name: tmp.name,
          going: tmp.going,
        }))
      : [];
    return {
      id: x.id,
      name: x.name,
      note: x.note,
      creator: x.creator_name,
      creatorId: x.creator_id,
      allParticipants,
      proceedingsTime: x.proceedings_time,
      createdAt: x.created_at,
      address,
    };
  });
};

const initialEventState: IEventStore = { events: [] };
const eventSlice = createSlice({
  name: "auth",
  initialState: initialEventState,
  reducers: {
    replaceEvents(state, action) {
      state.events = transformData(action.payload.events);
    },

    addEvents(state, action) {
      state.events = [...state.events, ...transformData(action.payload.events)];
    },

    addParticipant(state, action) {
      const index: number = state.events.findIndex(
        (x) => x.id === action.payload.eventId
      );
      state.events[index].allParticipants.push(action.payload.participant);
    },

    removeParticipant(state, action) {
      const index: number = state.events.findIndex(
        (x) => x.id === action.payload.eventId
      );
      const updatedParticipants = state.events[index].allParticipants.filter(
        (x) => x.id !== action.payload.participantId
      );
      state.events[index].allParticipants = updatedParticipants;
    },

    updateParticipant(state, action) {
      const index: number = state.events.findIndex(
        (x) => x.id === action.payload.eventId
      );
      const participantIndex: number = state.events[
        index
      ].allParticipants.findIndex((x) => x.id === action.payload.participantId);
      state.events[index].allParticipants[participantIndex].going =
        action.payload.going;
    },
  },
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
