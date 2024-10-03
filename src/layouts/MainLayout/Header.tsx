import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookIcon from "../../assets/svg/BookIcon";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import ListIcon from "../../assets/svg/ListIcon";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { UserIcon } from "../../assets/svg/UserIcon";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { PATHS } from "../../configs/paths.config";
import { useGetServices } from "../../hooks/useGetServices";
import { useLogout } from "../../hooks/useLogout";
import { getCategories } from "../../queryhooks/getCategories";
import { getSubcategoriesByCategoryId } from "../../queryhooks/getSubcategories";
import {
  CategoriesEntity,
  CategoriesResponse,
} from "../../types/categoriesResponse";
import {
  SubcategoriesEntity,
  SubcategoriesResponse,
} from "../../types/subCategoriesResponse";
import MainDropDown from "./components/MainDropDown";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryId, setCategoryId] = useState("");
  const [isMainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<null | string>(null);

  const toggleMainDropdown = () => {
    setMainDropdownOpen(!isMainDropdownOpen);
  };

  const toggleDropdown = (categoryId: string) => {
    if (openDropdown === categoryId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(categoryId);
    }
  };

  const { refetch } = useLogout();

  const { data } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategoriesMenu"],
    queryFn: getCategories,
  });

  const { data: subCategoriesData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategoriesMenu", categoryId],
    queryFn: () => getSubcategoriesByCategoryId(categoryId),
  });

  let items: CategoriesEntity[] = [];
  if (data?.data.categories) {
    items = data?.data.categories;
  }

  let subcategoriesItem: SubcategoriesEntity[] = [];
  if (subCategoriesData?.data.subcategories) {
    subcategoriesItem = subCategoriesData.data.subcategories;
  }

  const handleActionModal = () => {
    refetch()
      .then(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate(PATHS.HOME);
        toast.info("از حساب کاربری خود خارج شدید.");
      })
      .catch((error) => toast.error(error, { rtl: false }));
  };

  return (
    <>
      <header className="shadow-header fixed w-full bg-white z-50">
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
        <div className="LayoutContainer flex gap-8">
          <Dropdown
            backdrop="opaque"
            closeOnSelect={false}
            isOpen={isMainDropdownOpen}
            onClose={() => setMainDropdownOpen(false)}
          >
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                startContent={<ListIcon />}
                radius="sm"
                size="lg"
                variant="light"
                onClick={toggleMainDropdown}
              >
                دسته بندی ها
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Main Categories">
              {items.map((category) => (
                <DropdownItem
                  className="font-yekan"
                  key={category._id}
                  textValue={category.name}
                >
                  <Dropdown
                    key={category._id}
                    placement="left"
                    closeOnSelect={false}
                    isOpen={openDropdown === category._id}
                    onClose={() => setOpenDropdown(null)}
                  >
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="p-0 w-full bg-transparent data-[hover=true]:bg-transparent text-medium"
                        radius="sm"
                        variant="light"
                        onClick={() => {
                          setCategoryId(category._id);
                          toggleDropdown(category._id);
                        }}
                      >
                        <div className="w-full flex justify-between items-center">
                          {category.name}
                          <ChevronLeftIcon />
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Subcategories"
                      className="font-yekan"
                    >
                      {subcategoriesItem.map((subCategory) => (
                        <DropdownItem
                          key={subCategory._id}
                          textValue={subCategory.name}
                          onClick={() => {
                            navigate(`/category/${category._id}`);
                            setMainDropdownOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {subCategory.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            startContent={<BookIcon />}
            radius="sm"
            size="lg"
            variant="light"
          >
            جدیدترین کتاب ها
          </Button>
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
