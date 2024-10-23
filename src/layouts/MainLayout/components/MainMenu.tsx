import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookIcon from "../../../assets/svg/BookIcon";
import ChevronLeftIcon from "../../../assets/svg/ChevronLeftIcon";
import ListIcon from "../../../assets/svg/ListIcon";
import { useGetServices } from "../../../hooks/useGetServices";
import { getCategories } from "../../../queryhooks/getCategories";
import { getSubcategoriesByCategoryId } from "../../../queryhooks/getSubcategories";
import {
  CategoriesEntity,
  CategoriesResponse,
} from "../../../types/categoriesResponse";
import {
  SubcategoriesEntity,
  SubcategoriesResponse,
} from "../../../types/subCategoriesResponse";

export default function MainMenu() {
  const navigate = useNavigate();
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
  return (
    <section className="w-full gap-4 tablet:gap-8 fixed top-[80px] right-0 px-32 bg-white shadow-header hidden mobile:flex">
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
                      navigate(`category/${category._id}`);
                      setOpenDropdown(null);
                      setMainDropdownOpen(false);
                    }}
                    onMouseEnter={() => {
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
                <DropdownMenu aria-label="Subcategories" className="font-yekan">
                  {subcategoriesItem.map((subCategory) => (
                    <DropdownItem
                      key={subCategory._id}
                      textValue={subCategory.name}
                      onClick={() => {
                        navigate(`/subcategory/${subCategory._id}`);
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
    </section>
  );
}
