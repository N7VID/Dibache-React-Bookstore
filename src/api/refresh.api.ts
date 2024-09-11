import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

type Token = { refreshToken: string };

export const refresh = async (token: Token) => {
  const url = ENDPOINTS.AUTH.TOKEN;
  const response = await httpRequest.post(url, token);
  return response.data;
};
