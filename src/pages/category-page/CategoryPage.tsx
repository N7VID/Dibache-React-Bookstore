import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";

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
    <div className="LayoutContainer cursor-default  pb-16">
      <section className="w-full py-8 shadow-box bg-white rounded-lg mt-12 mb-8 px-10 flex justify-between items-center flex-col gap-8 md:flex-row">
        <h3 className="font-bold text-xl font-vazir">
          دسته بندی {categoryName}
        </h3>
        <div className="flex items-center flex-col gap-4 md:flex-row">
          <Input
            isClearable
            labelPlacement="inside"
            placeholder="جستجو در دسته بندی"
            className="w-64"
            value={q || ""}
            onChange={(e) =>
              setSearchParams({ ...currentParams, q: e.target.value })
            }
            startContent={
              <SearchIcon className="text-black/60 dark:text-white/90 cursor-default flex-shrink-0" />
            }
          />
          <Select
            size="sm"
            label={"فیلتر بر اساس"}
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
                  {groupBySubcategory[subcategory].map((item) => (
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
