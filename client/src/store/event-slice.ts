import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IEventStore } from "../models/Event";

type RootState = IEventStore;

const initialEventState = { events: [] };
const eventSlice = createSlice({
  name: "auth",
  initialState: initialEventState,
  reducers: {},
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const authActions = eventSlice.actions;
export default eventSlice.reducer;
