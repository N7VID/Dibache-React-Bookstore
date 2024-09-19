import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { PATHS } from "../configs/paths.config";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: props) {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? <Navigate to={PATHS.HOME} /> : children;
}
