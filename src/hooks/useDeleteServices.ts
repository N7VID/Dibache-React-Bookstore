import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Params<Response> {
  mutationKey: unknown[];
  mutationFn: (id: string) => Promise<Response>;
  options?: Omit<
    UseMutationOptions<Response, Error, AxiosResponse>,
    "mutationKey"
  >;
}

export const useDeleteServices = ({
  mutationKey,
  mutationFn,
  ...options
}: Params<Response>) => {
  return useMutation({ mutationKey, mutationFn, ...options });
};
