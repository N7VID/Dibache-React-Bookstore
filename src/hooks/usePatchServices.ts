import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface Params<T, Response> {
  mutationKey: string[];
  mutationFn: ({ data, id }: { data: T; id: string }) => Promise<Response>;
  invalidate?: string[];
  options?: Omit<
    UseMutationOptions<Response, Error, { data: T; id: string }>,
    "mutationKey"
  >;
}

export const usePatchServices = <T, Response>({
  mutationKey,
  mutationFn,
  invalidate,
  ...options
}: Params<T, Response>) => {
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
