import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import { PATHS } from "../../configs/paths.config";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";

export default function BookPage() {
  const { id } = useParams();
  const { data } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
    options: {
      enabled: !!id,
    },
  });
  const name = data?.data.product.name.split("اثر");

  return (
    <div className="LayoutContainer cursor-default">
      <div className="py-4">
        <Breadcrumbs separator={<ChevronLeftIcon className="size-3" />}>
          <BreadcrumbItem>
            <Link to={PATHS.HOME}>دیباچه</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/category/${data?.data.product.category._id}`}>
              {data?.data.product.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/category/${data?.data.product.category._id}`}>
              {data?.data.product.subcategory.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{name?.[0]}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  );
}
