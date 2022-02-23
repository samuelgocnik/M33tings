import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import eventSlice from "./event-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { auth: authSlice, ui: uiSlice, events: eventSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
