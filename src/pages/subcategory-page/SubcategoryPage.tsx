import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import SortCategory from "../../components/SortCategory/SortCategory";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import { PATHS } from "../../configs/paths.config";

export default function SubcategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "createdAt",
    q: "",
  });
  const currentParams = Object.fromEntries([...searchParams]);
  const sort = searchParams.get("sort");
  const q = searchParams.get("q");

  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetCategoryBooks", sort, id],
    queryFn: () =>
      getProducts({ limit: "0", subcategory: id, sort: sort || "createdAt" }),
  });

  let items: ProductsEntity[] = [];
  if (data?.data.products) {
    items = data.data.products;
  }

  function handleSortType(event: ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ sort: event.target.value });
  }

  function handleSortOrder(event: ChangeEvent<HTMLSelectElement>) {
    const field = sort?.replace("-", "") ?? "";
    if (event.target.value === "desc") {
      setSearchParams({ sort: `-${field}` });
    } else {
      setSearchParams({ sort: field });
    }
  }

  return (
    <div className="LayoutContainer cursor-default pb-16">
      <div className="py-4">
        <Breadcrumbs separator={<ChevronLeftIcon className="size-3" />}>
          <BreadcrumbItem>
            <Link
              to={PATHS.HOME}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              دیباچه
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/category/${items[0]?.category._id}`}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              {items[0]?.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/subcategory/${items[0]?.subcategory._id}`}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              {items[0]?.subcategory.name}
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <SortCategory
        name={`زیر مجموعه ${items[0]?.subcategory?.name}`}
        q={q}
        sort={sort}
        setSearchParams={setSearchParams}
        handleSortType={handleSortType}
        handleSortOrder={handleSortOrder}
        currentParams={currentParams}
      />
      <section className="py-4">
        <div className="flex justify-center flex-wrap items-center gap-4 py-8">
          {isLoading ? (
            <Spinner size="lg" color="current" />
          ) : (
            <>
              {items.map((item) => (
                <NextUiCard key={item._id} item={item} />
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
