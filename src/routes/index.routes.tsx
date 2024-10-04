import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "../configs/paths.config";
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
} from "../pages";
import { AuthLayout, DashboardLayout, MainLayout } from "../layouts";
import PrivateRoutes from "./Private.routes";
import Providers from "../providers";

export const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      {
        path: PATHS.HOME,
        element: <MainLayout />,
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
          { path: PATHS.BOOK, element: <BookPage /> },
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
                <PaymentResultPage />
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: PATHS.DASHBOARD,
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OrdersPage /> },
          { path: PATHS.INVENTORY, element: <InventoryPage /> },
          { path: PATHS.BOOKS, element: <BooksPage /> },
        ],
      },
      {
        path: PATHS.LOGIN,
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage /> },
          { path: PATHS.ADMIN, element: <AdminLoginPage /> },
        ],
      },
      {
        path: PATHS.REGISTER,
        element: <AuthLayout />,
        children: [{ index: true, element: <RegisterPage /> }],
      },
      {
        path: PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
]);
