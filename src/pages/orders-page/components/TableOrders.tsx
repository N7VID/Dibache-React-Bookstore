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
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { OrdersEntity, OrdersResponse } from "../../../types/ordersResponse";
import { renderItem } from "../../../utils/paginationRenderItem";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import OrdersModal from "./OrdersModal";

interface Params {
  data: OrdersResponse | undefined;
  searchParams: URLSearchParams;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  handlePriceSorting: () => void;
  handleCreatedAtSorting: () => void;
  refetch?: () => void;
}

export default function TableOrders({
  data,
  searchParams,
  isLoading,
  refetch,
  handlePageChange,
  handlePriceSorting,
  handleCreatedAtSorting,
}: Params) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalId, setModalId] = useState("");

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

  function handleDetailsModal(id: string) {
    onOpen();
    setModalId(id);
  }

  return (
    <>
      <Table
        aria-label="Example static collection table"
        className="cursor-default"
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
            const createdAt = item.createdAt;
            const faDate = createdAt
              ? new Date(createdAt).toLocaleDateString("fa-IR")
              : "";
            return (
              <TableRow key={item._id} className="border-b-1">
                <TableCell className="text-[10px] mobile:text-sm text-center py-3 px-0 mobile:px-3">{`${item.user.firstname} ${item.user.lastname}`}</TableCell>
                <TableCell className="text-[10px] mobile:text-sm text-center py-3 px-0 mobile:px-3">
                  <span>{toPersianNumber(item.totalPrice)}</span>
                </TableCell>
                <TableCell className="text-[10px] mobile:text-sm text-center py-3 px-0 mobile:px-3">
                  {faDate}
                </TableCell>
                <TableCell className="text-center px-0 mobile:px-3" py-3>
                  <Link
                    className="cursor-pointer text-[10px] mobile:text-sm"
                    size="sm"
                    onClick={() => handleDetailsModal(item._id)}
                  >
                    بررسی سفارش
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <OrdersModal
        modalId={modalId}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        refetch={refetch}
      />
    </>
  );
}
