import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Icart } from "../types/cartDatatype";
import { IBill } from "../types/billDataType";
import { ProductsEntity } from "../types/productType";

interface SelectedItem {
  id: string;
  name: string;
  item?: ProductsEntity | null;
}

interface ICartContext {
  cart: Icart;
  setCart: Dispatch<SetStateAction<Icart>>;
  setBillData: Dispatch<SetStateAction<IBill[]>>;
  billData: IBill[];
  selectedItemEditForm: SelectedItem;
  setSelectedItemEditForm: Dispatch<SetStateAction<SelectedItem>>;
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

  const [selectedItemEditForm, setSelectedItemEditForm] = useState<{
    id: string;
    name: string;
    item?: ProductsEntity | null;
  }>({
    id: "",
    name: "",
    item: null,
  });

  return (
    <RootContext.Provider
      value={{
        cart,
        setCart,
        billData,
        setBillData,
        selectedItemEditForm,
        setSelectedItemEditForm,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
