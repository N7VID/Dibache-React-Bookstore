import { Link } from "react-router-dom";
import ShoppingCart from "../../../assets/svg/ShoppingCartIcon";
import { PATHS } from "../../../configs/paths.config";
import ChevronLeftIcon from "../../../assets/svg/ChevronLeftIcon";
import PaymentCard from "./PaymentCard";
import { useContext } from "react";
import { RootContext } from "../../../context/RootContextProvider";

export default function PaymentCart() {
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { billData } = context;
  return (
    <section className="flex justify-center items-center px-4 py-6 gap-8 flex-col border border-key-gray rounded-lg mt-4">
      <div className="flex justify-between w-full font-semibold text-sm">
        <div className="flex items-center gap-3">
          <ShoppingCart />
          <span className="text-sm tablet:text-base">سبد خرید</span>
        </div>
        <div className="flex items-center text-persian-green">
          <Link to={PATHS.CART}>
            <span className="text-persian-green text-[12px] tablet:text-base font-semibold flex justify-between items-center gap-2">
              مشاهده سبد خرید
              <ChevronLeftIcon className="size-4" />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {billData.map((item) => (
          <PaymentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
