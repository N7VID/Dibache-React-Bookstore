import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Params {
  password: string;
  username: string;
}

interface params {
  mutationKey: string[];
  mutationFn: (data: Params) => Promise<unknown>;
  invalidate?: string[];
  options?: UseMutationOptions<AxiosResponse, Error, unknown, unknown>;
}

export const usePostService = ({
  mutationKey,
  mutationFn,
  invalidate,
  ...options
}: params) => {
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
