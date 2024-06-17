import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isConnected: false,
};

const signInSlice = createSlice({
  name: "connect",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isConnected = true;
    },
    logout: (state) => {
      state.token = null;
      state.isConnected = false;
    },
  },
});

export const { login, logout } = signInSlice.actions;
export default signInSlice.reducer;
