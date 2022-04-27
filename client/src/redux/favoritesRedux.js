import { createSlice } from "@reduxjs/toolkit";
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      if (
        state.products.findIndex((item) => item._id === action.payload._id) ===
        -1
      ) {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
    },

    emptyFavorites: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, emptyFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
