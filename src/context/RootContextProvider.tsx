import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Icart {
  userId: string;
  product: { id: string; count: number };
}

interface IBill {
  id: string;
  image: string | undefined;
  endPrice: number;
  discount: number;
  totalPrice: number;
}

interface ICartContext {
  cart: Icart[];
  setCart: Dispatch<SetStateAction<Icart[]>>;
  setBillData: Dispatch<SetStateAction<IBill[]>>;
  billData: IBill[];
}
export const RootContext = createContext<ICartContext | undefined>(undefined);

export default function RootContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Icart[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [billData, setBillData] = useState<IBill[]>([]);
  return (
    <RootContext.Provider value={{ cart, setCart, billData, setBillData }}>
      {children}
    </RootContext.Provider>
  );
}
