import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Connection = {
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

const initialState: Connection[] = [];

export const connectionsSlice = createSlice({
  name: "connections",
  initialState: initialState,
  reducers: {
    addConnections: (_state, action: PayloadAction<Connection[]>) =>
      action.payload,
    removeConnections: (_state, _action: PayloadAction<string>) => [],
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
