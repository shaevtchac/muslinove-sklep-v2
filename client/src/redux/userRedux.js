import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMsg: "",
  },
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingEnd: (state) => {
      state.isFetching = false;
      state.error = false;
      state.errorMsg = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },

    fetchingFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  fetchingStart,
  fetchingEnd,
  loginSuccess,
  registerSuccess,
  fetchingFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
