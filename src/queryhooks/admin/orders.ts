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

export const getOrdersById = async (id: string) => {
  const url = `${ENDPOINTS.ORDERS}/${id}`;
  const response = await httpRequest.get(url);
  return response.data;
};

export const patchOrders = async ({
  id,
  data,
}: {
  id: string;
  data: {
    user: string;
    products:
      | {
          product: string;
          count: number;
        }[]
      | undefined;

    deliveryStatus: boolean;
  };
}) => {
  const url = `${ENDPOINTS.ORDERS}/${id}`;
  const response = await httpRequest.patch(url, data);
  return response.data;
};
