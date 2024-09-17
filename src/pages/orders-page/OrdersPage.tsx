import { Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getOrders } from "../../queryhooks/admin/orders";
import { OrdersEntity, OrdersResponse } from "../../types/ordersResponse";
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

  const { data, isLoading } = useGetServices<OrdersResponse>({
    queryKey: ["GetOrders", params],
    queryFn: () => getOrders(params),
  });

  function handlePageChange(page: number) {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }

  let waitingOrders: OrdersEntity[] = [];
  let waitingOrdersCount: number = 0;
  let deliveredOrdersCount: number = 0;
  let deliveredOrders: OrdersEntity[] = [];
  if (data?.data.orders?.length) {
    waitingOrders = data.data.orders.filter(
      (item) => item.deliveryStatus === false
    );
    waitingOrdersCount = waitingOrders.length;
    deliveredOrders = data.data.orders.filter(
      (item) => item.deliveryStatus === true
    );
    deliveredOrdersCount = deliveredOrders.length;
  }

  return (
    <div className="LayoutContainer pt-[100px]">
      <Tabs aria-label="Options">
        <Tab key="waiting" title="سفارش های در انتظار ارسال">
          <TableOrders
            ordersCount={deliveredOrdersCount}
            data={data}
            isLoading={isLoading}
            searchParams={searchParams}
            items={waitingOrders}
            handlePageChange={handlePageChange}
          />
        </Tab>
        <Tab key="delivered" title="سفارش های تحویل شده">
          <TableOrders
            ordersCount={waitingOrdersCount}
            data={data}
            isLoading={isLoading}
            searchParams={searchParams}
            handlePageChange={handlePageChange}
            items={deliveredOrders}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
