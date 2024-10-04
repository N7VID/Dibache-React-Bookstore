import { Button, useDisclosure } from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useLogout } from "../../hooks/useLogout";
import { logout } from "../../queryhooks/auth";
import MainDropDown from "../MainLayout/components/MainDropDown";

export default function DashboardHeader() {
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onOpenChange: onOpenChangeLogout,
  } = useDisclosure();
  const { refetch } = useLogout();

  const handleActionModal = () => {
    refetch()
      .then(() => {
        logout({ href: PATHS.HOME });
        toast.info("از حساب کاربری خود خارج شدید.");
      })
      .catch((error) => toast.error(error, { rtl: false }));
  };

  return (
    <header>
      <div className="shadow-header fixed w-full bg-white z-20">
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
            <ul className="flex gap-8 px-4">
              <li>
                <NavLink to={PATHS.DASHBOARD}>سفارشات</NavLink>
              </li>
              <li>
                <NavLink to={PATHS.BOOKS}> محصولات</NavLink>
              </li>
              <li>
                <NavLink to={PATHS.INVENTORY}>موجودی</NavLink>
              </li>
            </ul>
          </div>
          <MainDropDown onOpen={onOpenLogout} />
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
