import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}
