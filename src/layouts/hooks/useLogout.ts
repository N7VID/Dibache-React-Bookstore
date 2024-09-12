import { useQuery } from "@tanstack/react-query";
import { logout } from "../../api/logout.api";

export const useLogout = (isQueryEnabled: boolean = false) => {
  return useQuery({
    queryKey: ["Logout"],
    queryFn: logout,
    enabled: isQueryEnabled,
  });
};
