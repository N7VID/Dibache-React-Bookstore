import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import PrivateRoutes from "../../routes/Private.routes";

export default function DashboardLayout() {
  return (
    <PrivateRoutes>
      <div className="flex flex-col min-h-screen font-yekan overflow-hidden">
        <DashboardHeader />
        <main className="flex-grow bg-ghost-white">{<Outlet />}</main>
        <DashboardFooter />
      </div>
    </PrivateRoutes>
  );
}
