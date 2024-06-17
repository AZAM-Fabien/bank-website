import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpAsync = createAsyncThunk(
  "newUser/signUp",
  async (_, { getState }) => {
    const email = getState().identity.email;
    const password = getState().identity.password;
    const userName = getState().userInfo.userName;
    const lastName = getState().userInfo.lastName;
    const firstName = getState().userInfo.firstName;

    const response = await fetch("http://localhost:3001/api/v1/user/signup", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userName: userName
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data.body);
      return data.body;
    }
  }
);

const signUpSlice = createSlice({
  name: "userSignUp",
  initialState: {
    status: null,
    data: {},
    error: {},
  },
  reducers: {
    reset: (state) => {
      (state.status = null), (state.data = {}), (state.error = {});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error:", action.error.message);
      });
  },
});

export const { reset } = signUpSlice.actions;
export default signUpSlice.reducer;
