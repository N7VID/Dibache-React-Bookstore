import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface params<Data, Response> {
  mutationKey: string[];
  mutationFn: (data: Data) => Promise<Response>;
  invalidate?: string[];
  options?: UseMutationOptions<AxiosResponse, Error, unknown>;
}

export const usePostService = <Data, Response>({
  mutationKey,
  mutationFn,
  invalidate,
  ...options
}: params<Data, Response>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidate });
    },
    ...options,
  });
};
