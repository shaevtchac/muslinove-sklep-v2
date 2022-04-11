import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sklep.muslinove.pl/api/"
    : "http://localhost:5000/api/";

export const getToken = () => {
  const storage = localStorage.getItem("persist:root");
  let user = null;
  if (storage === null) return "no data storage";
  user = JSON.parse(JSON.parse(storage).user).currentUser;
  if (user === null) return "no user logged in";

  return user.accessToken;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getToken()}` },
});

export const unregisteredOrderUpdateRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${localStorage.orderToken}` },
});

export const tPayRequest = axios.create({
  baseURL: "https://secure.tpay.com",
  headers: {
    id: process.env.TPAY_CLIENT_ID,
  },
});
