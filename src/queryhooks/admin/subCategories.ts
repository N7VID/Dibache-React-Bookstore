import { ENDPOINTS } from "../../constants";
import { httpRequest } from "../../services/http-request";

export const postSubCategories = async (data: {
  name: string;
  category: string;
}) => {
  const url = ENDPOINTS.SUBCATEGORIES;
  const response = await httpRequest.post(url, data);
  return response.data;
};
