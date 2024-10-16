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
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { PATHS } from "../../configs/paths.config";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "../../assets/svg/UserIcon";
import { useState } from "react";

export default function AuthHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "خانه", href: "/" },
    { name: "ثبت نام در دیباچه", href: PATHS.REGISTER },
  ];
  return (
    <header className="shadow-header fixed w-full bg-white">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="custom-navbar shadow-header bg-white fixed z-30 pt-[6px] pb-[10px] px-0"
      >
        <div className="flex LayoutContainer w-full items-center justify-between">
          <NavbarContent justify="center">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link href={PATHS.HOME}>
                <img src="/Dibache-1.png" alt="Dibache-logo" className="w-32" />
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4 px-4" justify="start">
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
            <Button
              className="bg-main-gray hidden laptop:flex"
              startContent={
                <UserIcon className="text-black/70 dark:text-white/90" />
              }
              onClick={() => navigate(PATHS.LOGIN)}
            >
              ورود به حساب کاربری
            </Button>
          </NavbarContent>
        </div>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.name}-${index}`}
              className="font-yekan"
            >
              <Link
                color={"foreground"}
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
      {/* <div className="LayoutContainer flex items-center justify-center md:justify-between gap-0 sm:gap-4">
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
        <div className="flex gap-4">
          <Button
            className="bg-main-gray hidden md:flex"
            startContent={
              <UserIcon className="text-black/70 dark:text-white/90" />
            }
            onClick={() => navigate(PATHS.LOGIN)}
          >
            ورود به حساب کاربری
          </Button>
        </div>
      </div> */}
    </header>
  );
}
