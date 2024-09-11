import { Navigate } from "react-router-dom";
import { PATHS } from "../configs/paths.config";
import Cookies from "js-cookie";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrivateRoutes({ children }: Props) {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? children : <Navigate to={PATHS.LOGIN} />;
}
