import { useParams } from "react-router-dom";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import NextUiCard from "../../components/NextUiCard/NextUiCard";

export default function CategoryPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetCategoryBooks"],
    queryFn: () => getProducts({ limit: "0", category: id }),
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

  return (
    <div className="LayoutContainer cursor-default">
      {Object.keys(groupBySubcategory).map((subcategory) => (
        <section className="py-6" key={subcategory}>
          <div className="flex justify-between items-center px-6">
            <h3 className="font-semibold text-xl">{subcategory}</h3>
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
      ))}
    </div>
  );
}
