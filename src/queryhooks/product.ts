import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";

interface ParamsType {
  limit: string;
  page: number;
  sort: string | null;
}

export const getProducts = async (searchParams: ParamsType) => {
  const url = ENDPOINTS.PRODUCTS;
  const response = await httpRequest.get(url, { params: searchParams });
  return response.data;
};
