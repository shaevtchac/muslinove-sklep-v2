import {
  publicRequest,
  unregisteredOrderUpdateRequest,
} from "../requestMethods";
import {
  loginFailure,
  loginStart,
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
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user, orderId) => {
  dispatch(registerStart());
  try {
    const userRes = await publicRequest.post("auth/register", user);
    const newUser = userRes.data;
    dispatch(registerSuccess(newUser));
    if (orderId) {
      try {
        const ordRes = await unregisteredOrderUpdateRequest.put(
          `auth/${orderId}`,
          { userId: newUser._id }
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
    dispatch(registerFailure());
  }
};
