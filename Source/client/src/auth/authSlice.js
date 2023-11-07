import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO } from 'config.js';

const userSession = JSON.parse(sessionStorage.getItem('currentUser')) || {};
const userLoggedIn = JSON.parse(sessionStorage.getItem('userLoggedIn')) || false;

const initialState = {
  isLogin: IS_DEMO ? true : userLoggedIn,
  currentUser: IS_DEMO ? DEFAULT_USER : userSession,
  addingItem: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    setIsLogInTrue: (state) => {
      state.isLogin = true;
    },
    setIsLogInFalse: (state) => {
      state.isLogin = false;
      state.currentUser = {};
    },
    setAddingItem: (state, action) => {
      state.addingItem = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export const { setIsLogInTrue } = authSlice.actions;
export const { setIsLogInFalse } = authSlice.actions;
export const { setAddingItem } = authSlice.actions;

export const isLogin = (state) => state.auth.isLogin;
export const currentUser = (state) => state.auth.currentUser;

const authReducer = authSlice.reducer;

export default authReducer;
