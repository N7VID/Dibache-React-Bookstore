import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { PATHS } from "../../configs/paths.config";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "../../assets/svg/UserIcon";

export default function AuthHeader() {
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
      </div>
    </header>
  );
}
