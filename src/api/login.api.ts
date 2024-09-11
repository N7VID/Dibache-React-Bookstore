import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

interface Params {
  password: string;
  username: string;
}

export const login = async (data: Params) => {
  const url = ENDPOINTS.AUTH.LOGIN;
  const response = await httpRequest.post(url, data);
  return response.data;
};
