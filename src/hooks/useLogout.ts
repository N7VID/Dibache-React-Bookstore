import { useQuery } from "@tanstack/react-query";
import { getLogout } from "../queryhooks/auth";

export const useLogout = (isQueryEnabled: boolean = false) => {
  return useQuery({
    queryKey: ["Logout"],
    queryFn: getLogout,
    enabled: isQueryEnabled,
  });
};
