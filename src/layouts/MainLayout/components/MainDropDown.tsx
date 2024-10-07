import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { UserIcon } from "../../../assets/svg/UserIcon";
import { User } from "../../../types/authResponse";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../configs/paths.config";
import { Key, useContext } from "react";
import { RootContext } from "../../../context/RootContextProvider";

interface props {
  onOpen: () => void;
}

export default function MainDropDown({ onOpen }: props) {
  const { role, firstname, lastname }: User = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const fullName = `${firstname} ${lastname}`;
  const navigate = useNavigate();
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart } = context;

  function handleDropDownItem(key: Key) {
    switch (key) {
      case "profile":
        console.log(key);
        break;
      case "cart":
        navigate(PATHS.CART);
        break;
      case "orders":
        console.log(key);
        break;
      case "dashboard":
        navigate(PATHS.DASHBOARD);
        break;
      case "logout":
        onOpen();
        break;
      default:
        console.log(key);
        break;
    }
  }
  return (
    <Dropdown className="font-yekan">
      <Badge
        content={""}
        color="danger"
        placement="top-left"
        isInvisible={cart.length === 0}
      >
        <DropdownTrigger>
          <Button
            variant="bordered"
            startContent={
              <UserIcon className="text-black/70 dark:text-white/90" />
            }
            endContent={
              <img
                src="/src/assets/svg/chevron-down-mini-black.svg"
                alt="chevron-down-logo"
                className="w-4"
              />
            }
          >
            {fullName}
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key: Key) => handleDropDownItem(key)}
        disabledKeys={["profile", "orders", "wishlist"]}
      >
        <DropdownItem
          key="profile"
          startContent={
            <img src="/src/assets/svg/user-black.svg" className="w-4" />
          }
        >
          پروفایل
        </DropdownItem>

        {role === "ADMIN" ? (
          <DropdownItem
            key="dashboard"
            startContent={
              <img src="/src/assets/svg/category-black.svg" className="w-4" />
            }
          >
            مدیریت
          </DropdownItem>
        ) : (
          <DropdownItem
            key="wishlist"
            startContent={
              <img src="/src/assets/svg/heart-black.svg" className="w-4" />
            }
          >
            لیست ها
          </DropdownItem>
        )}
        <DropdownItem
          key="cart"
          className="relative"
          textValue="cart"
          startContent={
            <img src="/src/assets/svg/cart-black.svg" className="w-4" />
          }
        >
          سبد خرید
          {cart.length !== 0 && (
            <div className="absolute top-1 right-[95px] w-[15.5px] h-[15.5px] text-[13px] flex justify-center items-center pb-[2px] rounded-full bg-badge-pink text-white p-1 font-thin">
              {cart.length}
            </div>
          )}
        </DropdownItem>
        <DropdownItem
          key="orders"
          startContent={
            <img src="/src/assets/svg/cart-black.svg" className="w-4" />
          }
        >
          سفارش ها
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          startContent={
            <img src="/src/assets/svg/logout-black.svg" className="w-4" />
          }
        >
          خروج از حساب کاربری
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
