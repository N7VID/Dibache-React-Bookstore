import Cookies from "js-cookie";
import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

type Token = { refreshToken: string };

export const postLoginData = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.LOGIN;
  const response = await httpRequest.post(url, data);
  return response.data;
};

export const getLogout = async () => {
  const url = ENDPOINTS.AUTH.LOGOUT;
  const response = await httpRequest.get(url);
  return response.data;
};

export const logout = ({ href }: { href: string }) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  location.href = href;
};

export const postRefreshToken = async (token: Token) => {
  const url = ENDPOINTS.AUTH.TOKEN;
  const response = await httpRequest.post(url, token);
  return response.data;
};

export const postRegisterData = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.SIGNUP;
  const response = await httpRequest.post(url, data);
  return response.data;
};
