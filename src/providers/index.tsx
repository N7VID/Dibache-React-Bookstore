import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import client from "../lib/react-query";

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={client}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
