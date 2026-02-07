import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Request = {
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

const initialState: Request[] = [];

const requestsSlice = createSlice({
  name: "requests",
  initialState: initialState,
  reducers: {
    addRequests: (_state, action: PayloadAction<Request[]>) => action.payload,
    removeRequest: (state, action: PayloadAction<string>) => {
      const newStore = (state ?? []).filter(
        (req) => req._id !== action.payload,
      );
      return newStore;
    },
  },
});

export const { addRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
