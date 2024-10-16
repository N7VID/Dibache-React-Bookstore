import { Link } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { useContext } from "react";
import { RootContext } from "../../context/RootContextProvider";
import { Badge } from "@nextui-org/react";

export default function MobileNavbar() {
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart } = context;
  return (
    <div className="md:hidden block px-6 sm:px-20 py-3 fixed bottom-0 bg-white z-50 w-full">
      <ul className="flex justify-between items-center">
        <Link to={PATHS.HOME}>
          <li className="flex flex-col items-center">
            <img
              src="/src/assets/svg/home-black.svg"
              className="w-6 sm:w-7"
              alt=""
            />
            <p className="sm:text-sm text-[12px]">صفحه اصلی</p>
          </li>
        </Link>
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/category-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">دسته ها</p>
        </li>
        <Badge
          content={cart.products.length}
          color="danger"
          placement="top-left"
          isInvisible={cart?.products?.length === 0 || !cart.products}
        >
          <Link to={PATHS.CART}>
            <li className="flex flex-col items-center">
              <img
                src="/src/assets/svg/cart-black.svg"
                className="w-6 sm:w-7"
                alt=""
              />
              <p className="sm:text-sm text-[12px]">سبد خرید</p>
            </li>
          </Link>
        </Badge>
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/user-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">پروفایل</p>
        </li>
      </ul>
    </div>
  );
}
