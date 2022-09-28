import { configureStore } from '@reduxjs/toolkit';
import transferReducer from './slices/transferSlice';
import optionReducer from './slices/optionSlice';
import ticketReducer from './slices/ticketSlice';

export const store = configureStore({
  reducer: {
    transfer: transferReducer,
    option: optionReducer,
    ticket: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
