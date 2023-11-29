import { expirationTime } from '@/helpers/expirationTime';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type adminInfo = {
  _id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  role: string;
  active: boolean;
  isLoggedIn: boolean;
  updatedAt: any;
}

type initialSatate = {
  userInfo: adminInfo;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  expirationTime: number;
}

const initialState: initialSatate = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : {},

  isLoggedIn: localStorage.getItem("isLoggedIn")
  ? JSON.parse(localStorage.getItem("isLoggedIn") || "")
  : false,

  isLoggedOut: localStorage.getItem("isLoggedOut")
  ? JSON.parse(localStorage.getItem("isLoggedOut") || "")
  : true,

  expirationTime: localStorage.getItem("expirationTime")
    ? JSON.parse(localStorage.getItem("expirationTime") || "")
    : 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // userRegistration: (state, action) => {
    //   state.token = action.payload.token;
    //   // state.user = action.payload.user;
    // },
    userLoggedIn: (state, action: PayloadAction<adminInfo>) => {
      state.userInfo = action.payload;
      // action.payload ? action.payload?.isLoggedIn : true
      state.isLoggedIn = action.payload?.isLoggedIn
      state.isLoggedOut = false;
      state.expirationTime = expirationTime(action.payload?.updatedAt);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload?.isLoggedIn));
      localStorage.setItem("isLoggedOut", JSON.stringify(false));
      localStorage.setItem("expirationTime", JSON.stringify(expirationTime(action.payload?.updatedAt)));
    },
    userLoggedOut: (state) => {
      // state.userInfo = {} as adminInfo || null;
      // state.isLoggedIn = false;
      // state.isLoggedOut = true;
      // state.expirationTime = 0;
      
      // localStorage.clear();
      
      localStorage.clear();
      state.userInfo = {} as adminInfo || null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.expirationTime = 0;
      localStorage.clear();
      // return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
