import { Outlet } from "react-router-dom";
import PrivateRoutes from "../../routes/Private.routes";
import DashboardFooter from "../DashboardLayout/DashboardFooter";
import Header from "../MainLayout/Header";

export default function SecondaryLayout() {
  return (
    <PrivateRoutes>
      <div className="flex flex-col min-h-screen overflow-hidden font-yekan">
        <Header />
        <main className="flex-grow bg-ghost-white pt-32">
          <Outlet />
        </main>
        <DashboardFooter />
      </div>
    </PrivateRoutes>
  );
}
