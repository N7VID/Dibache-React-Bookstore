import { Button, Input, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { UserIcon } from "../../assets/svg/UserIcon";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useLogout } from "../hooks/useLogout";
import MainDropDown from "./components/MainDropDown";

export default function Header() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logout = useLogout(isQueryEnabled);

  const handleActionModal = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsQueryEnabled(true);
    navigate(PATHS.HOME);
  };

  return (
    <>
      <header className="shadow-header fixed w-full bg-white">
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
          {accessToken ? (
            <>
              <MainDropDown onOpen={onOpen} />
            </>
          ) : (
            <Button
              className="bg-main-gray hidden md:flex"
              startContent={
                <UserIcon className="text-black/70 dark:text-white/90" />
              }
              onClick={() => navigate(PATHS.LOGIN)}
            >
              ورود به حساب کاربری
            </Button>
          )}
        </div>
        <NextUiModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onAction={() => handleActionModal()}
          modalTitle="از حساب کاربری خارج می‌شوید؟"
          modalBody="با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید."
          buttonContent={["انصراف", "خروج از حساب"]}
        />
      </header>
    </>
  );
}
