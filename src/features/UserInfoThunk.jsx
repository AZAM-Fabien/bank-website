import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../Slices/userInfoSlice";

export const UserInfoAsync = createAsyncThunk(
  "user/retrieveInfo",
  async (_, { dispatch, getState }) => {
    const token = getState().connect.token;
    const isConnected = getState().connect.isConnected;
    const tokenSession = window.sessionStorage.getItem("tokenSession");
    let chosenToken = null;
    if (isConnected === false) {
      if (tokenSession === null) {
        // it is supposed not to be possible to go there because of the way the protected route is written
        throw new Error("No token found");
      }
      chosenToken = tokenSession;
    
    } else {
      chosenToken = token;
    }

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chosenToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    if (response.ok) {
      const data = await response.json();
      window.sessionStorage.setItem("userName", data.body.userName);
      dispatch(
        getUserInfo({
          userName: data.body.userName,
          firstName: data.body.firstName,
          lastName: data.body.lastName,
        })
      );
      return data.body;
    }
  }
);

const UserInfoAsyncSlice = createSlice({
  name: "UserInfoAsync",
  initialState: {
    status: null,
    data: {},
    error: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(UserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserInfoAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(UserInfoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error:", action.error.message);
      });
  },
});

export default UserInfoAsyncSlice.reducer;
