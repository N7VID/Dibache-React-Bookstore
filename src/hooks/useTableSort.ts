import { useSearchParams } from "react-router-dom";

export function useTableSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || "5";
  const currentParams = Object.fromEntries([...searchParams]);

  function handlePriceOrderColumn() {
    const newSort = currentParams.sort === "price" ? "-price" : "price";
    setSearchParams({ ...currentParams, sort: newSort });
  }
  function handleInventoryOrderColumn() {
    const newSort =
      currentParams.sort === "quantity" ? "-quantity" : "quantity";
    setSearchParams({ ...currentParams, sort: newSort });
  }
  function handlePageChange(page: number) {
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }
  function handleNameOrderColumn() {
    const newSort = currentParams.sort === "name" ? "-name" : "name";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  return {
    handlePriceOrderColumn,
    handleInventoryOrderColumn,
    handlePageChange,
    handleNameOrderColumn,
  };
}
