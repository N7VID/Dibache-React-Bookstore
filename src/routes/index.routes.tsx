import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "../configs/paths.config";
import { AuthLayout, DashboardLayout, MainLayout } from "../layouts";
import DashboardFooter from "../layouts/DashboardLayout/DashboardFooter";
import Header from "../layouts/MainLayout/Header";
import {
  AdminLoginPage,
  BookPage,
  BooksPage,
  CartPage,
  CategoryPage,
  HomePage,
  InventoryPage,
  LoginPage,
  NotFoundPage,
  OrdersPage,
  PaymentPage,
  PaymentResultPage,
  RegisterPage,
  SubCategory,
} from "../pages";
import Providers from "../providers";
import PrivateRoutes from "./Private.routes";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

export const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      {
        path: PATHS.HOME,
        element: (
          <Suspense fallback={<Loading />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          { index: true, element: <HomePage /> },
          {
            path: PATHS.CART,
            element: (
              <PrivateRoutes>
                <CartPage />
              </PrivateRoutes>
            ),
          },
          { path: PATHS.CATEGORY, element: <CategoryPage /> },
          { path: PATHS.SUBCATEGORY, element: <SubCategory /> },
          { path: PATHS.BOOK, element: <BookPage /> },
        ],
      },
      {
        path: PATHS.DASHBOARD,
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        ),
        children: [
          { index: true, element: <OrdersPage /> },
          { path: PATHS.INVENTORY, element: <InventoryPage /> },
          { path: PATHS.BOOKS, element: <BooksPage /> },
        ],
      },
      {
        path: PATHS.LOGIN,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [
          { index: true, element: <LoginPage /> },
          { path: PATHS.ADMIN, element: <AdminLoginPage /> },
        ],
      },
      {
        path: PATHS.REGISTER,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [{ index: true, element: <RegisterPage /> }],
      },
      {
        path: PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: PATHS.PAYMENT,
        element: (
          <PrivateRoutes>
            <PaymentPage />
          </PrivateRoutes>
        ),
      },
      {
        path: PATHS.PAYMENT_RESULT,
        element: (
          <PrivateRoutes>
            <div className="flex flex-col min-h-screen overflow-hidden font-yekan">
              <Header />
              <main className="flex-grow bg-ghost-white pt-32">
                <PaymentResultPage />
              </main>
              <DashboardFooter />
            </div>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
