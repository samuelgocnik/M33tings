import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import messageSlice from './message-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { message: messageSlice, auth: authSlice, ui: uiSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
