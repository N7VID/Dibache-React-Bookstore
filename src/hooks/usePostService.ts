import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface params<Data, Response> {
  mutationKey: string[];
  mutationFn: (data: Data) => Promise<Response>;
  invalidate?: string[];
  options?: Omit<UseMutationOptions<Response, Error, Data>, "mutationKey">;
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
    onSuccess: (data, variables, context) => {
      if (invalidate) queryClient.invalidateQueries({ queryKey: invalidate });
      if (options?.options?.onSuccess)
        options.options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
