import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

export const registerApi = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.SIGNUP;
  const response = await httpRequest.post(url, data);
  return response.data;
};
