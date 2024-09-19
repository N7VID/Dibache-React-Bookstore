import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

export const getCategories = async () => {
  const url = ENDPOINTS.CATEGORIES;
  const response = await httpRequest.get(url);
  return response.data;
};
