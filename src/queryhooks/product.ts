import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

interface ParamsType {
  limit?: number;
  page: number;
  sort?: string;
}

export const getProducts = async (searchParams: ParamsType) => {
  const url = ENDPOINTS.PRODUCTS;
  const response = await httpRequest.get(url, { params: searchParams });
  return response.data;
};
