import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userReducer";
import feedReducer from "./features/feedReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
