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
            id: x.address.id,
            eventId: x.address.event_id,
            street: x.address.street,
            streetNumber: x.address.street_number,
            city: x.address.city,
            country: x.address.country,
            createdAt: x.address.created_at,
          };
        }
        return {
          id: x.id,
          name: x.name,
          note: x.note,
          creator: x.creator_name,
          creatorId: x.creator_id,
          allParticipants: x.all_participants,
          proceedingsTime: x.proceedings_time,
          createdAt: x.created_at,
          address,
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
