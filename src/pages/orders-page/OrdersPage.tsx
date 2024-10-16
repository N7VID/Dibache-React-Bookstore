import { Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getOrders } from "../../queryhooks/admin/orders";
import { OrdersResponse } from "../../types/ordersResponse";
import TableOrders from "./components/TableOrders";
import { useTableSort } from "../../hooks/useTableSort";

export default function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleTotalPriceOrderColumn, handleCreatedAtOrderColumn } =
    useTableSort();
  const limit = searchParams.get("limit") || "5";
  const sort = searchParams.get("sort") || "-createdAt";

  const params: {
    page: number;
    limit: string;
    sort: string | null;
  } = {
    page: Number(searchParams.get("page")) || 1,
    limit,
    sort,
  };

  const handleSelectionChange = () => {
    if (searchParams.size !== 0) {
      setSearchParams("");
    }
  };

  const { data: ordersData, isLoading: isLoadingOrdersData } =
    useGetServices<OrdersResponse>({
      queryKey: ["GetOrders", params],
      queryFn: () => getOrders(params),
    });

  const { data: deliveredOrdersData, isLoading: isLoadingDeliveredOrders } =
    useGetServices<OrdersResponse>({
      queryKey: ["GetDeliveredOrders", params],
      queryFn: () => getOrders(params, true),
    });

  const {
    data: waitingOrdersData,
    isLoading: isLoadingWaitingOrders,
    refetch,
  } = useGetServices<OrdersResponse>({
    queryKey: ["GetWaitingOrders", params],
    queryFn: () => getOrders(params, false),
  });

  function handlePageChange(page: number) {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }

  return (
    <div className="LayoutContainer pt-[85px] md:px-16 cursor-default">
      <h2 className="text-2xl text-value-gray font-semibold py-6">
        مدیریت سفارشات
      </h2>
      <Tabs aria-label="Options" onSelectionChange={handleSelectionChange}>
        <Tab key="waiting" title="در انتظار ارسال">
          <TableOrders
            refetch={refetch}
            data={waitingOrdersData}
            isLoading={isLoadingWaitingOrders}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handleTotalPriceOrderColumn}
          />
        </Tab>
        <Tab key="delivered" title="تحویل شده">
          <TableOrders
            data={deliveredOrdersData}
            isLoading={isLoadingDeliveredOrders}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handleTotalPriceOrderColumn}
          />
        </Tab>
        <Tab key="all" title="همه سفارشات">
          <TableOrders
            data={ordersData}
            isLoading={isLoadingOrdersData}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handleTotalPriceOrderColumn}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
