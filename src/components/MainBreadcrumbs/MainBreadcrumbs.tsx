import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import { Link } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { ProductsEntity } from "../../types/productType";

interface Props {
  product: ProductsEntity;
  type: "single" | "subcategory" | "category";
}

export default function MainBreadcrumbs({ product, type }: Props) {
  const name = product?.name.split("اثر");

  const categoryLink = `/category/${product?.category?._id}`;
  const subcategoryLink = product?.subcategory?._id
    ? `/subcategory/${product?.subcategory?._id}`
    : "";

  let breadcrumbItems: { to: string; label: string }[] = [];

  switch (type) {
    case "category":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
      ];
      break;
    case "subcategory":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
        {
          to: subcategoryLink,
          label: product?.subcategory?.name || "",
        },
      ];
      break;
    case "single":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
        {
          to: subcategoryLink,
          label: product?.subcategory?.name || "",
        },
        {
          to: "",
          label: name?.[0] || "",
        },
      ];
      break;
    default:
      break;
  }

  return (
    <Breadcrumbs separator={<ChevronLeftIcon className="size-3" />}>
      <BreadcrumbItem>
        <Link to={PATHS.HOME} className="text-[11px] tablet:text-[14px]">
          دیباچه
        </Link>
      </BreadcrumbItem>
      {breadcrumbItems.map((item) => (
        <BreadcrumbItem key={item.label}>
          <Link to={item.to} className="text-[11px] tablet:text-[14px]">
            {item.label}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
