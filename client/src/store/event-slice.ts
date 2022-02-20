import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IEventStore } from "../models/Event";

type RootState = IEventStore;

const initialEventState: IEventStore = { events: [] };
const eventSlice = createSlice({
  name: "auth",
  initialState: initialEventState,
  reducers: {
    replaceEvents(state, action) {
      state.events = action.payload.events.map((x: any) => {
        // only change naming convention to camelCase
        let address = null;
        if (x.address) {
          address = {
            eventId: x.address.event_id,
            streetNumber: x.address.street_number,
            createdAt: x.address.created_at,
            ...x.address,
          };
        }
        return {
          allParticipants: x.all_participants,
          proceedingsTime: x.proceedings_time,
          createdAt: x.created_at,
          creatorId: x.creator_id,
          address: address,
          ...x,
        };
      });
    },
  },
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
