import { createSlice } from "@reduxjs/toolkit";
import { IUiSlice, UiTitles, UiTypes } from "./../models/Ui";

const initialState: IUiSlice = {
  notification: { type: UiTypes.None, title: UiTitles.None, message: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setNoneNotification(state) {
      state.notification = {
        type: UiTypes.None,
        title: UiTitles.None,
        message: "",
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
