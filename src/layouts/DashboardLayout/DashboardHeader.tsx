import { Button, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useLogout } from "../../hooks/useLogout";
import MainDropDown from "../MainLayout/components/MainDropDown";

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
              {/* <li>
                <NavLink
                  to={""}
                >
                  کاربران
                </NavLink>
              </li> */}
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
