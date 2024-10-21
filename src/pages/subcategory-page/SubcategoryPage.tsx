import { Pagination, Spinner } from "@nextui-org/react";
import { ChangeEvent, useMemo } from "react";
import {
  ScrollRestoration,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MainBreadcrumbs from "../../components/MainBreadcrumbs/MainBreadcrumbs";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import SortCategory from "../../components/SortCategory/SortCategory";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { renderItem } from "../../utils/paginationRenderItem";

export default function SubcategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "createdAt",
    page: "1",
  });
  const currentParams = Object.fromEntries([...searchParams]);
  const sort = searchParams.get("sort");
  const q = searchParams.get("q");

  const params = {
    limit: "6",
    subcategory: id,
    sort: sort || "createdAt",
    page: Number(searchParams.get("page")) || 1,
  };

  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetCategoryBooks", params, id],
    queryFn: () => getProducts(params),
  });

  let items: ProductsEntity[] = [];
  if (data?.data.products) {
    items = data.data.products;
  }

  const perPage = data?.per_page ? data?.per_page : 6;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / perPage) : 0;
  }, [data?.total, perPage]);

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

  function handlePageChange(page: number) {
    setSearchParams({ ...currentParams, page: page.toString() });
  }

  return (
    <div className="LayoutContainer cursor-default pb-16">
      <ScrollRestoration />
      <div className="py-4">
        <MainBreadcrumbs type="subcategory" product={items[0]} />
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
      <section className="py-4 flex flex-col gap-6">
        <div className="flex gap-4 px-6 py-8 overflow-x-auto scrollbar-hide">
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
        <Pagination
          showShadow
          renderItem={renderItem}
          showControls
          color="primary"
          variant="bordered"
          total={pages}
          initialPage={1}
          page={Number(searchParams.get("page")) || 1}
          onChange={(page) => handlePageChange(page)}
        />
      </section>
    </div>
  );
}
