import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "../Slices/signInSlices.jsx";
import logInSlice from "../Slices/logInSlice.jsx";
import connectionSlice from "../features/loginThunk.jsx";
import modalSlice from "../Slices/modalSlice.jsx";
import userInfoAsyncSlice from "../features/UserInfoThunk.jsx";
import userInfoSlice from "../Slices/userInfoSlice.jsx";
import signUpSlice from "../features/SignUpThunk.jsx";

export const store = configureStore({
  reducer: {
    connect: signInSlice,
    identity: logInSlice,
    userConnection: connectionSlice,
    modal: modalSlice,
    UserInfoAsync: userInfoAsyncSlice,
    userInfo: userInfoSlice,
    userSignUp: signUpSlice,
  },
});
