import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
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

const initialState = null as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
