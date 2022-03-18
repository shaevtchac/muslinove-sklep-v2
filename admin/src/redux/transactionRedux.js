import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL transactions_________________________________________________________________
    getTransactionsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTransactionsSuccess: (state, action) => {
      state.isFetching = false;
      state.transactions = action.payload;
    },
    getTransactionsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //update transaction_________________________________________________________________
    updateTransactionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTransactionSuccess: (state, action) => {
      state.isFetching = false;
      state.transactions[
        state.transactions.findIndex((item) => item.id === action.payload.id)
      ] = action.payload;
    },
    updateTransactionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    reset: (state) => {
      state.isFetching = false;
      state.error = false;
      state.transactions = [];
    },
  },
});

export const {
  getTransactionsFailure,
  getTransactionsStart,
  getTransactionsSuccess,
  updateTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  reset,
} = transactionSlice.actions;
export default transactionSlice.reducer;
