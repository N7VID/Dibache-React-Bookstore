import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";
import { refresh } from "../api/refresh.api";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});

httpRequest.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const status = error.response.status;
    const originRequest = error.config;
    const refreshToken = Cookies.get("refreshToken");
    if (status === 401 && refreshToken) {
      return refresh({ refreshToken })
        .then((res) => {
          Cookies.set("accessToken", res.token.accessToken);
          return httpRequest.request(originRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  }
);
