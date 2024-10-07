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

interface ICartContext {
  cart: Icart[];
  setCart: Dispatch<SetStateAction<Icart[]>>;
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
  return (
    <RootContext.Provider value={{ cart, setCart }}>
      {children}
    </RootContext.Provider>
  );
}
