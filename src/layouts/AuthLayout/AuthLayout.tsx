import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen font-yekan">
      <AuthHeader />
      <main className="flex-grow bg-ghost-white">{<Outlet />}</main>
      <AuthFooter />
    </div>
  );
}
