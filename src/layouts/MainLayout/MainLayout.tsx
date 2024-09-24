import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen font-yekan">
      <Header />
      <main className="flex-grow bg-ghost-white pt-32">{<Outlet />}</main>
      <Footer />
    </div>
  );
}
