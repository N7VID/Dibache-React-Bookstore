import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

export const logout = async () => {
  const url = ENDPOINTS.AUTH.LOGOUT;
  const response = await httpRequest.get(url);
  return response.data;
};
