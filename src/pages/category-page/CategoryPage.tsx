import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { ChangeEvent } from "react";
import {
  Link,
  ScrollRestoration,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import SortCategory from "../../components/SortCategory/SortCategory";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { PATHS } from "../../configs/paths.config";

export default function CategoryPage() {
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
      getProducts({ limit: "0", category: id, sort: sort || "createdAt" }),
  });

  let items: ProductsEntity[] = [];
  if (data?.data.products) {
    items = data.data.products;
  }

  let categoryName = "";
  const groupBySubcategory = items.reduce((result, item) => {
    const subcategoryName = item.subcategory.name as string;
    categoryName = item.category.name as string;
    if (!result[subcategoryName]) {
      result[subcategoryName] = [];
    }
    result[subcategoryName].push(item);
    return result;
  }, {} as { [key: string]: typeof items });

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
      <ScrollRestoration />
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
        </Breadcrumbs>
      </div>
      <SortCategory
        name={`دسته بندی ${categoryName}`}
        q={q}
        sort={sort}
        setSearchParams={setSearchParams}
        handleSortType={handleSortType}
        handleSortOrder={handleSortOrder}
        currentParams={currentParams}
      />
      {Object.keys(groupBySubcategory).map((subcategory) => {
        const subId = groupBySubcategory[subcategory]
          ?.map((item) => item.subcategory._id)
          .filter((value, index, curr) => curr.indexOf(value) === index);
        return (
          <section className="py-4" key={subcategory}>
            <div className="flex justify-between items-center px-6">
              <h3 className="font-semibold text-xl">{subcategory}</h3>
              <Link to={`/subcategory/${subId}`}>
                <span className="text-persian-green font-semibold flex justify-between items-center gap-2">
                  مشاهده همه
                  <ChevronLeftIcon className="size-4" />
                </span>
              </Link>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-4 py-8">
              {isLoading ? (
                <Spinner size="lg" color="current" />
              ) : (
                <>
                  {groupBySubcategory[subcategory].slice(0, 6).map((item) => (
                    <NextUiCard key={item._id} item={item} />
                  ))}
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
