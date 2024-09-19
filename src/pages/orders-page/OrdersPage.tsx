import { Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getOrders } from "../../queryhooks/admin/orders";
import { OrdersResponse } from "../../types/ordersResponse";
import TableOrders from "./components/TableOrders";

export default function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit") || "5";
  const sort = searchParams.get("sort") || "createdAt";

  const params: {
    page: number;
    limit: string;
    sort: string | null;
  } = {
    page: Number(searchParams.get("page")) || 1,
    limit,
    sort,
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

  const { data: waitingOrdersData, isLoading: isLoadingWaitingOrders } =
    useGetServices<OrdersResponse>({
      queryKey: ["GetWaitingOrders", params],
      queryFn: () => getOrders(params, false),
    });

  function handlePageChange(page: number) {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }

  function handlePriceOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort =
      currentParams.sort === "totalPrice" ? "-totalPrice" : "totalPrice";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  function handleCreatedAtOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort =
      currentParams.sort === "createdAt" ? "-createdAt" : "createdAt";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  return (
    <div className="LayoutContainer pt-[100px]">
      <Tabs aria-label="Options">
        <Tab key="waiting" title="در انتظار ارسال">
          <TableOrders
            data={waitingOrdersData}
            isLoading={isLoadingWaitingOrders}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handlePriceOrderColumn}
          />
        </Tab>
        <Tab key="delivered" title="تحویل شده">
          <TableOrders
            data={deliveredOrdersData}
            isLoading={isLoadingDeliveredOrders}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handlePriceOrderColumn}
          />
        </Tab>
        <Tab key="all" title="همه سفارشات">
          <TableOrders
            data={ordersData}
            isLoading={isLoadingOrdersData}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            handlePriceSorting={handlePriceOrderColumn}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
