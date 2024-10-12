import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useGetServices } from "../../../hooks/useGetServices";
import { getOrdersById, patchOrders } from "../../../queryhooks/admin/orders";
import {
  Order,
  OrdersByIdResponse,
  ProductsEntity,
} from "../../../types/ordersByIdResponse";
import { usePatchServices } from "../../../hooks/usePatchServices";
import { toast } from "react-toastify";
import { toPersianNumber } from "../../../utils/toPersianNumber";

interface props {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  modalId: string;
}

export default function OrdersModal({
  isOpen,
  onOpenChange,
  onClose,
  modalId,
}: props) {
  const { data } = useGetServices<OrdersByIdResponse>({
    queryKey: ["GetOrdersById", modalId],
    queryFn: () => getOrdersById(modalId),
  });

  let items: ProductsEntity[] = [];
  if (data?.data.order?.products?.length) {
    items = data?.data.order?.products;
  }

  const { mutate, isPending } = usePatchServices({
    mutationKey: ["PatchStatusOrder"],
    mutationFn: patchOrders,
    invalidate: ["GetOrders", "GetDeliveredOrders", "GetWaitingOrders"],
    options: {
      onSuccess: () => {
        onClose();
        toast.success("سفارش مورد نظر با موفقیت تحویل داده شد.");
      },
      onError: (error) => {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  function handleChangeStatusButton(order: Order) {
    const products = order?.products?.map((product) => ({
      product: product.product._id,
      count: product.count,
    }));

    const updatedData = {
      deliveryStatus: true,
      user: order?.user?._id,
      products,
    };
    mutate({ id: order._id, data: updatedData });
  }

  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="font-yekan cursor-default"
        scrollBehavior="inside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              نمایش سفارش
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 pb-8 text-sm">
                <div className="flex justify-between px-10 mt-4">
                  <span>نام مشتری</span>
                  <span className="font-semibold">{`${data?.data.order?.user?.firstname} ${data?.data.order?.user?.lastname}`}</span>
                </div>
                <div className="flex justify-between px-10">
                  <span>آدرس</span>
                  <span className="font-semibold">
                    {data?.data.order?.user?.address}
                  </span>
                </div>
                <div className="flex justify-between px-10">
                  <span>شماره تماس</span>
                  <span className="font-semibold">
                    {data?.data.order?.user?.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between px-10">
                  <span>زمان تحویل</span>
                  <span className="font-semibold">
                    {data?.data.order?.deliveryDate &&
                      new Date(
                        data?.data.order?.deliveryDate
                      ).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between px-10">
                  <span>زمان سفارش</span>
                  <span className="font-semibold">
                    {data?.data.order?.createdAt &&
                      new Date(data?.data.order?.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                  </span>
                </div>
                <div className="flex justify-between px-10 mb-4">
                  <span>قیمت کل سفارش</span>
                  <span className="font-semibold">
                    {data?.data?.order &&
                      toPersianNumber(data?.data?.order?.totalPrice)}{" "}
                    تومان
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>محصول</TableColumn>
                    <TableColumn>قیمت</TableColumn>
                    <TableColumn>تعداد</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.product._id} className="border-b-1">
                        <TableCell>
                          <Link
                            href={`/book/${item.product._id}`}
                            className="text-sm"
                          >
                            {item.product.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {toPersianNumber(item.product.price)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {toPersianNumber(item.count)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  {data?.data.order?.deliveryStatus ? (
                    <div className="flex justify-between px-20">
                      <span>زمان تحویل</span>
                      <span>
                        {data?.data.order?.updatedAt &&
                          new Date(
                            data?.data.order?.updatedAt
                          ).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <Button
                        className="bg-persian-green text-white w-60"
                        onClick={() => {
                          if (data?.data?.order)
                            handleChangeStatusButton(data?.data?.order);
                        }}
                      >
                        {isPending ? <Spinner /> : "تحویل شد"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
