import axios from "axios";

const BASE_URL = "https://sklep.muslinove.pl/api/"; //"http://localhost:5000/api/"; "https://sklep.muslinove.pl/api/"

const storage = localStorage.getItem("persist:root");
const localStorageUser = storage
  ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser
  : null;
const TOKEN = localStorageUser
  ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser.accessToken
  : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const tPayRequest = axios.create({
  baseURL: "https://secure.tpay.com",
  headers: {
    id: process.env.TPAY_CLIENT_ID,
  },
});
