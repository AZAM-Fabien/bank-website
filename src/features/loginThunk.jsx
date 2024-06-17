import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../Slices/signInSlices.jsx";

export const loginAsync = createAsyncThunk(
  "user/connection",
  async (_, { dispatch, getState }) => {
    const email = getState().identity.email;
    const password = getState().identity.password;

    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    if (response.ok) {
      const data = await response.json();
      dispatch(login(data.body.token));
      window.sessionStorage.setItem("connected", true),
        window.sessionStorage.setItem("tokenSession", data.body.token),
        console.log("token", data.body.token);
      return data.body.token;
    }
  }
);

const connectionSlice = createSlice({
  name: "userConnection",
  initialState: {
    connection: {
      status: null,
      data: {},
      error: {},
    },
  },
  reducers: {
    reset: (state) => {
      state.connection = {
        status: null,
        data: {},
        error: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.connection.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.connection.status = "success";
        state.connection.data = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.connection.status = "failed";
        state.connection.error = action.error.message;
        console.error("Error:", action.error.message);
      });
  },
});

export const { reset } = connectionSlice.actions;
export default connectionSlice.reducer;
