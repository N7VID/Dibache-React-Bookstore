import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../lib/react-query";

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
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
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
