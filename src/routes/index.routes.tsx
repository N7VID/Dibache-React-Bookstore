import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "../configs/paths.config";
import {
  BookPage,
  BooksPage,
  CartPage,
  CategoryPage,
  HomePage,
  InventoryPage,
  OrdersPage,
  PaymentPage,
  PaymentResultPage,
} from "../pages";
import { DashboardLayout, MainLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATHS.CART, element: <CartPage /> },
      { path: PATHS.CATEGORY, element: <CategoryPage /> },
      { path: PATHS.BOOK, element: <BookPage /> },
      { path: PATHS.PAYMENT, element: <PaymentPage /> },
      { path: PATHS.PAYMENT_RESULT, element: <PaymentResultPage /> },
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
]);
