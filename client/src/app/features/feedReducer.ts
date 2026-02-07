import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Feed = {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  gender: string;
  photoUrl?: string;
  age: number;
  about: string;
};

const initialState: Feed[] = [];

export const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    addFeed: (_state, action: PayloadAction<Feed[]>) => action.payload,
    removeFeed: (state, action: PayloadAction<string>) => {
      const newState = (state ?? []).filter(
        (feed: any) => feed._id !== action.payload,
      );

      return newState;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
