import {configureStore} from '@reduxjs/toolkit';
import TaskSlice from './slices/TaskSlice';

export const store = configureStore({
  reducer: {
    task: TaskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
