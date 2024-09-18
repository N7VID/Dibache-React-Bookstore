import {
  Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo } from "react";
import { OrdersEntity, OrdersResponse } from "../../../types/ordersResponse";
import { renderItem } from "../../../utils/paginationRenderItem";

interface Params {
  data: OrdersResponse | undefined;
  searchParams: URLSearchParams;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  handlePriceSorting: () => void;
  handleCreatedAtSorting: () => void;
}

export default function TableOrders({
  data,
  searchParams,
  isLoading,
  handlePageChange,
  handlePriceSorting,
  handleCreatedAtSorting,
}: Params) {
  const rowsPerPage = data?.per_page ? data?.per_page : 5;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);
  const loadingState =
    isLoading || data?.data.orders?.length === 0 ? "loading" : "idle";

  let items: OrdersEntity[] = [];
  if (data?.data.orders?.length) {
    items = data.data.orders;
  }

  return (
    <Table
      aria-label="Example static collection table"
      className="py-6 cursor-default"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              dir="rtl"
              renderItem={renderItem}
              showControls
              size="sm"
              showShadow
              radius="md"
              color="primary"
              page={Number(searchParams.get("page")) || 1}
              total={pages}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="username" className="text-center">
          نام کاربر
        </TableColumn>
        <TableColumn
          key="name"
          allowsSorting
          className="text-center"
          onClick={handlePriceSorting}
        >
          مجموع مبلغ
        </TableColumn>
        <TableColumn
          key="category"
          allowsSorting
          className="text-center"
          onClick={handleCreatedAtSorting}
        >
          زمان ثبت سفارش
        </TableColumn>
        <TableColumn key="action" className="text-center">
          عملیات
        </TableColumn>
      </TableHeader>
      <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
        {items.map((item) => {
          const createdAt = data?.data.orders?.[0].createdAt;
          const faDate = createdAt
            ? new Date(createdAt).toLocaleDateString("fa-IR")
            : "";
          return (
            <TableRow key={item._id} className="border-b-1">
              <TableCell className="text-center py-3">{`${item.user.firstname} ${item.user.lastname}`}</TableCell>
              <TableCell className="text-center py-3">
                {item.totalPrice}
              </TableCell>
              <TableCell className="text-center py-3">{faDate}</TableCell>
              <TableCell className="text-center py-3">
                <Link className="cursor-pointer" size="sm">
                  بررسی سفارش
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
