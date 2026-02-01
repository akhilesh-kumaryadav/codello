import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userReducer";
import feedReducer from "./features/feedReducer";
import connectionsReducer from "./features/connectionsReducer";
import requestsReducer from "./features/requestsReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
