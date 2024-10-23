import { lazy } from "react";
const MainLayout = lazy(() => import("./MainLayout/MainLayout"));
const AuthLayout = lazy(() => import("./AuthLayout/AuthLayout"));
const DashboardLayout = lazy(() => import("./DashboardLayout/DashboardLayout"));
const SecondaryLayout = lazy(() => import("./SecondaryLayout/SecondaryLayout"));

export { MainLayout };
export { AuthLayout };
export { DashboardLayout };
export { SecondaryLayout };
