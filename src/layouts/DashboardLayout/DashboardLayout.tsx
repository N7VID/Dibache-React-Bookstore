import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-grow">{<Outlet />}</main>
      <DashboardFooter />
    </div>
  );
}
