import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

export const loginApi = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.LOGIN;
  const response = await httpRequest.post(url, data);
  return response.data;
};
