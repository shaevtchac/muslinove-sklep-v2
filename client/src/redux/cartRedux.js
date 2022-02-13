import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    itemsInCart: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (
        state.products.findIndex((item) => item._id === action.payload._id) > -1
      ) {
        state.products[
          state.products.findIndex((item) => item._id === action.payload._id)
        ].quantity += action.payload.quantity;
      } else {
        state.itemsInCart += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.itemsInCart -= 1;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ].quantity += 1;
      state.total += action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      let index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.products[index].quantity > 0) {
        state.products[index].quantity -= 1;
        state.total -= action.payload.price;
      }
      if (state.products[index].quantity === 0) {
        state.products.splice(index, 1);
        state.itemsInCart -= 1;
      }
    },
    emptyCart: (state) => {
      state.products = [];
      state.total = 0;
      state.itemsInCart = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
