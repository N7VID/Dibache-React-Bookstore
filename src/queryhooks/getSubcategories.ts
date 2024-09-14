import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

export const getSubcategories = async () => {
  const url = ENDPOINTS.SUBCATEGORIES;
  const response = await httpRequest.get(url);
  return response.data;
};
