import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface Params<Response> {
  mutationKey: string[];
  mutationFn: (id: string) => Promise<Response>;
  invalidate?: string[];
  options?: Omit<UseMutationOptions<Response, Error, string>, "mutationKey">;
}

export const useDeleteServices = <Response>({
  mutationKey,
  mutationFn,
  invalidate,
  options,
}: Params<Response>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (invalidate) queryClient.invalidateQueries({ queryKey: invalidate });
      if (options?.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
