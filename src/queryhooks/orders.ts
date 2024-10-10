import { ENDPOINTS } from "../constants";
import { httpRequest } from "../services/http-request";
import { Icart } from "../types/cartDatatype";

export const postOrders = async (data: Icart) => {
  const url = `${ENDPOINTS.ORDERS}`;
  const response = await httpRequest.post(url, data);
  return response.data;
};
