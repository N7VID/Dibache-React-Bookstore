import { ENDPOINTS } from "../../constants";
import { httpRequest } from "../../services/http-request";

interface IParams {
  page: number;
  limit: string;
  sort: string | null;
}

export const getOrders = async (params: IParams) => {
  const url = ENDPOINTS.ORDERS;
  const response = await httpRequest.get(url, { params });
  return response.data;
};
