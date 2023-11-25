import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserLoggedInPayload {
  userName: string;
  email: string;
  _id: string;
  
}

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : null,

  isLoggedIn: localStorage.getItem("isLoggedIn")
  ? JSON.parse(localStorage.getItem("isLoggedIn") || "")
  : false,

  isLoggedOut: localStorage.getItem("isLoggedOut")
  ? JSON.parse(localStorage.getItem("isLoggedOut") || "")
  : true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // userRegistration: (state, action) => {
    //   state.token = action.payload.token;
    //   // state.user = action.payload.user;
    // },
    userLoggedIn: (state, action) => {
      state.userInfo = action.payload;
      // action.payload ? action.payload?.isLoggedIn : true
      state.isLoggedIn = true;
      state.isLoggedOut = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("isLoggedOut", JSON.stringify(false));
    },
    userLoggedOut: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      localStorage.removeItem("userInfo");
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      localStorage.setItem("isLoggedOut", JSON.stringify(true));
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
