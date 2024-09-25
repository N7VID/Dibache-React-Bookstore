import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";

export default function CategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "createdAt",
  });
  const sort = searchParams.get("sort");

  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetCategoryBooks", sort],
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
    <div className="LayoutContainer cursor-default">
      <section className="w-full py-8 shadow-box bg-white rounded-lg mt-12 mb-8 px-10 flex justify-between items-center flex-col gap-8 md:flex-row">
        <h3 className="font-bold text-xl font-vazir">
          دسته بندی {categoryName}
        </h3>
        <div className="flex items-center flex-col gap-4 md:flex-row">
          <span className="font-bold text-sm">فیلتر بر اساس</span>
          <Select
            size="sm"
            label={"فیلتر"}
            className="w-48"
            onChange={(event) => handleSortType(event)}
            selectedKeys={sort ? [sort.replace("-", "")] : undefined}
          >
            <SelectItem key={"name"} className="font-yekan">
              نام
            </SelectItem>
            <SelectItem key={"brand"} className="font-yekan">
              انتشارات
            </SelectItem>
            <SelectItem key={"quantity"} className="font-yekan">
              موجودی
            </SelectItem>
            <SelectItem key={"price"} className="font-yekan">
              قیمت
            </SelectItem>
            <SelectItem key={"discount"} className="font-yekan">
              تخفیف
            </SelectItem>
            <SelectItem key={"createdAt"} className="font-yekan">
              تاریخ ایجاد
            </SelectItem>
          </Select>
          <Select
            size="sm"
            label={"ترتیب"}
            className="w-36"
            onChange={(event) => handleSortOrder(event)}
            selectedKeys={[sort?.includes("-") ? "desc" : "asc"]}
          >
            <SelectItem key={"asc"} className="font-yekan">
              صعودی
            </SelectItem>
            <SelectItem key={"desc"} className="font-yekan">
              نزولی
            </SelectItem>
          </Select>
        </div>
      </section>
      {Object.keys(groupBySubcategory).map((subcategory) => (
        <section className="py-6" key={subcategory}>
          <div className="flex justify-between items-center px-6">
            <h3 className="font-semibold text-xl">{subcategory}</h3>
          </div>
          <div className="flex justify-center flex-wrap items-center gap-4 py-4">
            {isLoading ? (
              <Spinner size="lg" color="current" />
            ) : (
              <>
                {groupBySubcategory[subcategory].map((item) => (
                  <NextUiCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
