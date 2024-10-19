import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { UserIcon } from "../../assets/svg/UserIcon";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useLogout } from "../../hooks/useLogout";
import { logout } from "../../queryhooks/auth";
import { User } from "../../types/authResponse";
import MainDropDown from "./components/MainDropDown";
import MainMenu from "./components/MainMenu";

export default function Header() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const { role }: User = JSON.parse(localStorage.getItem("user") || "{}");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicMenuItems = [
    { name: "ورود", href: PATHS.LOGIN },
    { name: "ثبت نام", href: PATHS.REGISTER },
  ];

  const userMenuItems = [
    { name: "پروفایل", href: "/" },
    { name: "علاقه مندی ها", href: "/" },
    { name: "سبد خرید", href: PATHS.CART },
    { name: "خروج از حساب کاربری", href: "/" },
  ];

  const adminMenuItems = [
    { name: "پروفایل", href: "/" },
    { name: "سفارشات", href: "/dashboard" },
    { name: "محصولات", href: "/dashboard/books" },
    { name: "موجودی", href: "/dashboard/inventory" },
    { name: "علاقه مندی ها", href: "/" },
    { name: "سبد خرید", href: PATHS.CART },
    { name: "خروج از حساب کاربری", href: "/" },
  ];

  const menuItems = !accessToken
    ? publicMenuItems
    : role === "ADMIN"
    ? adminMenuItems
    : userMenuItems;

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
    <>
      <header className="LayoutContainer shadow-header fixed w-full bg-white z-50">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="custom-navbar bg-white fixed pt-[6px] pb-[10px] px-0"
        >
          <div className="flex w-full items-center justify-between">
            <NavbarContent justify="center">
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand>
                <Link href={PATHS.HOME}>
                  <img
                    src="/Dibache-1.png"
                    alt="Dibache-logo"
                    className="w-32"
                  />
                </Link>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent
              className="hidden sm:flex gap-4 px-4"
              justify="start"
            >
              <Input
                isClearable
                labelPlacement="inside"
                placeholder="جستجو در دیباچه"
                radius="full"
                size="md"
                className="laptop:w-[450px] md:w-[350px] w-[210px]"
                startContent={
                  <SearchIcon className="text-black/60 dark:text-white/90 cursor-pointer flex-shrink-0" />
                }
              />
            </NavbarContent>
            <NavbarContent justify="center" className="hidden sm:block">
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
            </NavbarContent>
          </div>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem
                key={`${item.name}-${index}`}
                className="font-yekan"
              >
                <Link
                  color={
                    index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  className="w-full"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
        <MainMenu />
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
