import {
  publicRequest,
  userRequest,
  unregisteredOrderUpdateRequest,
} from "../requestMethods";
import { emptyCart } from "./cartRedux";
import {
  loginFailure,
  loginStart,
  logout,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const logOut = async (dispatch, user, cart) => {
  try {
    await publicRequest.put(`carts/${user._id}`, cart, {
      headers: { token: `Bearer ${user.accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
  dispatch(emptyCart());
  dispatch(logout());
};
export const register = async (dispatch, user, orderId) => {
  dispatch(registerStart());
  try {
    const userRes = await publicRequest.post("auth/register", user);
    const newUser = userRes.data;
    dispatch(registerSuccess(newUser));
    //create empty cart for new user
    try {
      userRequest.post("carts", { user: newUser._id });
    } catch (cartErr) {
      console.error(cartErr);
    }
    //assign order to new user if it was placed before registration
    if (orderId) {
      try {
        const ordRes = await unregisteredOrderUpdateRequest.put(
          `auth/${orderId}`,
          { user: newUser._id }
        );
      } catch (orderUpdErr) {
        console.error(
          "Problem ze zakualizowaniem id w zamówieniu złożonym przez niezarejestrowanego użytkownika"
        );
        console.error(orderUpdErr);
      }
    }
  } catch (error) {
    console.error("problem z utworzeniem nowego użytkownika");
    console.error(error);
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    dispatch(registerFailure(error.response.data));
  }
};
