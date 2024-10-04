import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";
import { logout, postRefreshToken } from "../queryhooks/auth";
import { PATHS } from "../configs/paths.config";

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
      return postRefreshToken({ refreshToken })
        .then((res) => {
          Cookies.set("accessToken", res.token.accessToken);
          return httpRequest.request(originRequest);
        })
        .catch((error) => {
          logout({ href: PATHS.LOGIN });
          return Promise.reject(error);
        });
    }
  }
);
