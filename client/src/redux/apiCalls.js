import {
  publicRequest,
  userRequest,
  unregisteredOrderUpdateRequest,
} from "../requestMethods";
import { emptyCart } from "./cartRedux";
import {
  fetchingStart,
  logout,
  loginSuccess,
  registerSuccess,
  fetchingFailure,
  fetchingEnd,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(fetchingStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(fetchingFailure());
  }
};

export const logOut = async (dispatch, user, cart) => {
  try {
    await publicRequest.put(
      `carts/${user._id}`,
      { user, cart },
      {
        headers: { token: `Bearer ${user.accessToken}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
  dispatch(emptyCart());
  dispatch(logout());
};
export const register = async (dispatch, user, orderId) => {
  dispatch(fetchingStart());
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
    dispatch(fetchingFailure(error.response.data));
  }
};

export const resetPassword = async (dispatch, email) => {
  dispatch(fetchingStart());

  publicRequest
    .post("/email/reset_password", email)
    .then(
      () => {
        dispatch(fetchingEnd());
      },
      (err) => {
        dispatch(fetchingFailure(err.response.data));
      }
    )
    .catch((err) => {
      console.log(err);
    });
};

export const validateToken = async (dispatch, token, userId) => {
  dispatch(fetchingStart);
  try {
    const res = await publicRequest.post("/auth/validate_token", {
      token,
      userId,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(fetchingFailure(error.response.data));
  }
};
