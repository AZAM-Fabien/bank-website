import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const EditUserNameAsync = createAsyncThunk(
  "user/putUserName",
  async (_, { getState }) => {
    const newUserName = getState().userInfo.newUserName;
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


    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chosenToken}` 
        },
        body: JSON.stringify({
            userName: newUserName,
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

const EditUserNameAsyncSlice = createSlice({
  name: "EditUserNameAsync",
  initialState: {
      status: null,
      data: {},
      error: {},
  },
  reducers: {  },

  extraReducers: (builder) => {
    builder
      .addCase(EditUserNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditUserNameAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(EditUserNameAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error:", action.error.message);
      });
  },
});

export default EditUserNameAsyncSlice.reducer;
