import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import ProtectedRoutes from "../../routes/Protected.routes";

export default function AuthLayout() {
  return (
    <ProtectedRoutes>
      <div className="flex flex-col min-h-screen font-yekan overflow-hidden">
        <AuthHeader />
        <main className="flex-grow bg-ghost-white">{<Outlet />}</main>
        <AuthFooter />
      </div>
    </ProtectedRoutes>
  );
}
