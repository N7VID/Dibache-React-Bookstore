import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Params<Response> {
  queryKey: unknown[];
  queryFn: (data: unknown) => Promise<Response>;
  options?: UseQueryOptions<Response, Error, AxiosResponse>;
}
export const useGetServices = <Response>({
  queryKey,
  queryFn,
  ...options
}: Params<Response>) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
