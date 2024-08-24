import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const sosSlice = createSlice({
  name: "sosSlice",
  initialState,
  reducers: {},
});

export const {} = sosSlice.actions;

export default sosSlice.reducer;
