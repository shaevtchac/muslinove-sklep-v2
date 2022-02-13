import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDk3MTdkODRjZTQ3YzIyMzFjNTE1ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjI1MDc1MSwiZXhwIjoxNjQyNTA5OTUxfQ.boUmaAU5_GIrLO2LDeS0W7WSEAJBdbU4tglHuzvY2qU";

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
