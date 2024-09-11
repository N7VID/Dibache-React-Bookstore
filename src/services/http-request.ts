import axios from "axios";
import { BASE_URL } from "../constants";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});
