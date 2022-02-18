import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL_________________________________________________________________
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete_________________________________________________________________
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //update_________________________________________________________________
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //upload _______________________________________________________________________________
    uploadProductPictureStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    uploadProductPictureSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ].images = action.payload.images;
    },
    uploadProductPictureFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //remove image_______________________________________________________________________________
    removeProductPictureStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removeProductPictureSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ].images = action.payload.images;
    },
    removeProductPictureFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //add_________________________________________________________________
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    reset: (state) => {
      state.products = [];
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  uploadProductPictureStart,
  uploadProductPictureSuccess,
  uploadProductPictureFailure,
  removeProductPictureStart,
  removeProductPictureSuccess,
  removeProductPictureFailure,
  reset,
} = productSlice.actions;
export default productSlice.reducer;
