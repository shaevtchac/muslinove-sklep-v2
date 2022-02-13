import { publicRequest, userRequest, userRequestFile } from "../requestMethods";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  uploadProductPictureFailure,
  uploadProductPictureStart,
  uploadProductPictureSuccess,
  removeProductPictureFailure,
  removeProductPictureStart,
  removeProductPictureSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};
export const uploadProductPicture = async (id, formData, images, dispatch) => {
  var updImages = images.slice();
  dispatch(uploadProductPictureStart());
  try {
    const res = await userRequestFile.post("/images/upload", formData);
    updImages.push(`/images/${res.data}`);
    dispatch(uploadProductPictureSuccess({ id, images: updImages }));
    updateProduct(id, { images: updImages }, dispatch);
  } catch (error) {
    dispatch(uploadProductPictureFailure());
    console.error(error);
  }
};
export const removeProductPicture = async (id, images, imgNo, dispatch) => {
  const path = images[imgNo];
  var updImages = images.slice();
  updImages.splice(imgNo, 1);
  dispatch(removeProductPictureStart());
  try {
    const res = await userRequest.post("/images/remove", { path });
    dispatch(removeProductPictureSuccess({ id, images: updImages }));
    updateProduct(id, { images: updImages }, dispatch);
  } catch (error) {
    dispatch(removeProductPictureFailure());
    console.error(error);
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
