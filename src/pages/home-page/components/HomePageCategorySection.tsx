import { Link } from "react-router-dom";
import ChevronLeftIcon from "../../../assets/svg/ChevronLeftIcon";
import { Spinner } from "@nextui-org/react";
import NextUiCard from "../../../components/NextUiCard/NextUiCard";
import { ProductsEntity } from "../../../types/productType";

interface Params {
  path: string | undefined;
  isLoading: boolean;
  title: string;
  categoryItems: ProductsEntity[];
}

export default function HomePageCategorySection({
  path,
  title,
  isLoading,
  categoryItems,
}: Params) {
  return (
    <section className="py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center px-6">
        <h3 className="font-semibold text-sm tablet:text-lg">{title}</h3>
        <Link to={`/category/${path}`}>
          <span className="text-persian-green text-sm tablet:text-lg font-semibold flex justify-between items-center gap-2">
            مشاهده همه
            <ChevronLeftIcon className="size-4" />
          </span>
        </Link>
      </div>
      <div className="flex gap-4 px-6 py-8 overflow-x-auto scrollbar-hide">
        {isLoading ? (
          <Spinner size="lg" color="current" />
        ) : (
          <>
            {categoryItems.map((item) => (
              <NextUiCard key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
