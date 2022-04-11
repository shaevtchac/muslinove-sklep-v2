import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
    errorMsg: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    //GET ALL users_________________________________________________________________
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //update user_________________________________________________________________
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item.id === action.payload.id)
      ] = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    reset: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.users = [];
    },
  },
});

export const {
  loginSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  fetchingStart,
  fetchingFailure,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
