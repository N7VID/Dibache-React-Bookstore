import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { PATHS } from "../../configs/paths.config";
import { UserIcon } from "../../assets/svg/UserIcon";

export default function DashboardHeader() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="LayoutContainer flex items-center justify-center md:justify-between gap-0 sm:gap-4 md:-my-3">
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
                src="/Dibache-logo.svg"
                alt="Dibache-logo"
                className="w-36 mt-2"
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
        <Dropdown className="font-yekan">
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
              ادمین سایت
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="profile">پروفایل</DropdownItem>
            <DropdownItem key="logout" className="text-danger" color="danger">
              خروج از حساب
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex LayoutContainer bg-ghost-white pt-4">
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
      </div>
    </header>
  );
}
