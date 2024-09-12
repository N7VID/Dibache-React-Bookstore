import { Button, Input, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useLogout } from "../hooks/useLogout";
import MainDropDown from "../MainLayout/components/MainDropDown";
import DropDown from "./components/DropDown";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onOpenChange: onOpenChangeLogout,
  } = useDisclosure();
  const { refetch } = useLogout();

  const handleActionModal = () => {
    refetch().then(() => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate(PATHS.HOME);
    });
  };

  return (
    <header>
      <div className="shadow-header fixed w-full bg-white">
        <div className="LayoutContainer flex items-center justify-center md:justify-between gap-0 sm:gap-4">
          <div className="flex items-center justify-between md:gap-4 gap-2">
            <div className="flex items-center">
              <Button
                variant="bordered"
                isIconOnly
                aria-label="sidebar"
                className="flex md:hidden"
              >
                <img
                  src="/src/assets/svg/menu-ham-black.svg"
                  className="w-7"
                  alt="sidebar-icon"
                />
              </Button>
              <Link to={PATHS.HOME}>
                <img
                  src="/Dibache-1.png"
                  alt="Dibache-logo"
                  className="w-32 my-2"
                />
              </Link>
            </div>
            <Input
              isClearable
              labelPlacement="inside"
              placeholder="جستجو در دیباچه"
              radius="full"
              size="md"
              className="sm:w-[450px] w-[210px]"
              startContent={
                <SearchIcon className="text-black/60 dark:text-white/90 cursor-pointer flex-shrink-0" />
              }
            />
          </div>
          <MainDropDown onOpen={onOpenLogout} />
        </div>
      </div>
      <div className="bg-ghost-white">
        <div className="flex pt-24 justify-between items-center LayoutContainer">
          <Tabs
            aria-label="Options"
            onSelectionChange={(key) => {
              if (key === "orders") navigate(PATHS.DASHBOARD);
              else if (key === "books") navigate(PATHS.BOOKS);
              else if (key === "inventory") navigate(PATHS.INVENTORY);
            }}
          >
            <Tab key="orders" title="سفارشات" />
            <Tab key="books" title="محصولات" />
            <Tab key="inventory" title="موجودی" />
            <Tab key="users" title="کاربران" isDisabled />
          </Tabs>
          <DropDown />
        </div>
      </div>
      <NextUiModal
        isOpen={isOpenLogout}
        onOpenChange={onOpenChangeLogout}
        onAction={() => handleActionModal()}
        modalTitle="از حساب کاربری خارج می‌شوید؟"
        modalBody="با خروج از حساب کاربری، به داشبورد مدیریت دسترسی نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید."
        buttonContent={["انصراف", "خروج از حساب"]}
      />
    </header>
  );
}
