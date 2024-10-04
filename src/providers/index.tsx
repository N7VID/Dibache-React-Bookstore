import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../lib/react-query";

export default function Providers() {
  const navigate = useNavigate();
  return (
    <QueryClientProvider client={client}>
      <ToastContainer
        bodyClassName="toastBody"
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <NextUIProvider navigate={navigate}>
        <Outlet />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
