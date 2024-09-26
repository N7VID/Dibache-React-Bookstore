import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Params<Response> {
  queryKey: unknown[];
  queryFn: (data: unknown) => Promise<Response>;
  options?: Omit<UseQueryOptions<Response, Error, AxiosResponse>, "queryKey">;
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
