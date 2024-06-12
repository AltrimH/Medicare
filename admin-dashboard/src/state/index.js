import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "65dc82248fb95bbf585625f9"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
