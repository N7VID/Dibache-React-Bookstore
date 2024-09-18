import { ENDPOINTS } from "../../constants";
import { httpRequest } from "../../services/http-request";

interface IParams {
  page: number;
  limit: string;
  sort: string | null;
}

export const getOrders = async (
  params: IParams,
  deliveryStatus: boolean | null = null
) => {
  const url =
    deliveryStatus !== null
      ? `${ENDPOINTS.ORDERS}?deliveryStatus=${deliveryStatus}`
      : ENDPOINTS.ORDERS;
  const response = await httpRequest.get(url, { params });
  return response.data;
};
