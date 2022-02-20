import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IUserCookie } from "../models/User";

type RootState = IUserCookie;

const initialAuthState: IUserCookie = { token: null, user: null };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = {
        createdAt: action.payload.user.created_at,
        id: action.payload.user._id,
        ...action.payload.user,
      };
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const authActions = authSlice.actions;
export default authSlice.reducer;
