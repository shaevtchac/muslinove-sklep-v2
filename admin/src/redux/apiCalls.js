import { publicRequest, userRequest, userRequestForm } from "../requestMethods";
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
    console.error(error);
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.error(error);
  }
};
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const dbRes = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess({ id }));
    try {
      const fsRes = await userRequest.post("/images/remove_dir", {
        id: id,
      });
    } catch (fsError) {
      console.error(fsError);
    }
  } catch (dbError) {
    dispatch(deleteProductFailure());
    console.error(dbError);
  }
};
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
    console.error(error);
  }
};
export const uploadProductPicture = async (id, formData, images, dispatch) => {
  var updImages = images.slice();
  dispatch(uploadProductPictureStart());
  try {
    const res = await userRequestForm.post("/images/upload", formData);
    updImages.push(`/images/${id}/${res.data}`);
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
    const databaseRes = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(databaseRes.data));
    try {
      const fsRes = await userRequest.post("/images/create_dir", {
        id: databaseRes.data._id,
      });
    } catch (fsError) {
      console.error(fsError);
    }
  } catch (dbError) {
    dispatch(addProductFailure());
    console.error(dbError);
  }
};
