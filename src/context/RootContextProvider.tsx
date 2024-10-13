import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Icart } from "../types/cartDatatype";
import { IBill } from "../types/billDataType";

interface ICartContext {
  cart: Icart;
  setCart: Dispatch<SetStateAction<Icart>>;
  setBillData: Dispatch<SetStateAction<IBill[]>>;
  billData: IBill[];
}
export const RootContext = createContext<ICartContext | undefined>(undefined);

export default function RootContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Icart>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const [billData, setBillData] = useState<IBill[]>([]);

  return (
    <RootContext.Provider value={{ cart, setCart, billData, setBillData }}>
      {children}
    </RootContext.Provider>
  );
}
