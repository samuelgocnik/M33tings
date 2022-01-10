import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import messageSlice from './message-slice';

const store = configureStore({
  reducer: { message: messageSlice, auth: authSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
