import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IUserCookie } from '../models/User';

type RootState = IUserCookie;

const initialAuthState: IUserCookie = { loggedIn: true, user: null };
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const authActions = authSlice.actions;
export default authSlice.reducer;
