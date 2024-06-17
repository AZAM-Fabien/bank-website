import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  checked: false,
};

const logInSlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    removeIdentity: (state) => {
      state.email = null;
      state.password = null;
    },
    checkCheckbox: (state) => {
      state.checked = !state.checked;
      if (state.checked === false) {
        window.localStorage.removeItem("checked");
    }},
    defaultChecked: (state) => {
      state.checked = true;
    },
  },
});

export const { addEmail, addPassword, removeIdentity, checkCheckbox, defaultChecked } = logInSlice.actions;
export default logInSlice.reducer;
