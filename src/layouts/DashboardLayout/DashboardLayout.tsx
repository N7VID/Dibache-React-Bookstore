import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen font-yekan">
      <DashboardHeader />
      <main className="flex-grow bg-ghost-white">{<Outlet />}</main>
      <DashboardFooter />
    </div>
  );
}
