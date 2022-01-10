import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface IMessageState {
  successfulRegistration: boolean;
  successfulLogout: boolean;
}
type RootState = IMessageState;

const initialState: IMessageState = {
  successfulRegistration: false,
  successfulLogout: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSuccessfulRegistration(state, action) {
      state.successfulRegistration = action.payload.value;
    },
    setSuccessfulLogout(state, action) {
      state.successfulLogout = action.payload.value;
    },
  },
});

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn);
}

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
