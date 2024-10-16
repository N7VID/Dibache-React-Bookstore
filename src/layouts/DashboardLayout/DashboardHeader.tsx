import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState([
    { name: "سفارشات", href: PATHS.DASHBOARD, isActive: false },
    { name: "محصولات", href: PATHS.BOOKS, isActive: false },
    { name: "موجودی", href: PATHS.INVENTORY, isActive: false },
  ]);

  const handleActionModal = () => {
    refetch()
      .then(() => {
        logout({ href: PATHS.HOME });
        toast.info("از حساب کاربری خود خارج شدید.");
      })
      .catch((error) => toast.error(error, { rtl: false }));
  };

  const menuItems = [
    { name: "پروفایل", href: "/" },
    { name: "سفارشات", href: "/" },
    { name: "محصولات", href: "/dashboard/books" },
    { name: "موجودی", href: "/dashboard/inventory" },
    { name: "علاقه مندی ها", href: "/" },
    { name: "سبد خرید", href: PATHS.CART },
    { name: "خروج از حساب کاربری", href: "/" },
  ];

  const location = useLocation();
  useEffect(() => {
    setNavbarItems((prev) =>
      prev.map((item) => {
        if (location.pathname === "/dashboard") {
          return item.href === "/dashboard"
            ? { ...item, isActive: true }
            : { ...item, isActive: false };
        } else {
          return location.pathname.includes(`/${item.href}`)
            ? { ...item, isActive: true }
            : { ...item, isActive: false };
        }
      })
    );
  }, [location.pathname]);

  return (
    <header>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="custom-navbar shadow-header bg-white fixed z-30 py-[6px] px-0"
      >
        <div className="flex LayoutContainer w-full items-center justify-between">
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
                  className="w-32 my-2"
                />
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4 px-4" justify="start">
            {navbarItems.map((navbarItem) => (
              <NavbarItem
                key={navbarItem.name}
                isActive={navbarItem.isActive}
                onClick={() =>
                  setNavbarItems((prev) =>
                    prev.map((item) =>
                      item.name === navbarItem.name
                        ? { ...item, isActive: true }
                        : { ...item, isActive: false }
                    )
                  )
                }
              >
                <li>
                  <NavLink to={navbarItem.href}>{navbarItem.name}</NavLink>
                </li>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="center" className="hidden sm:block">
            <MainDropDown onOpen={onOpenLogout} />
          </NavbarContent>
        </div>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.name}-${index}`}
              className="font-yekan"
            >
              <Link
                color={index === menuItems.length - 1 ? "danger" : "foreground"}
                className="w-full"
                href={item.href}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
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
