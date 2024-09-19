import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useGetServices } from "../../../hooks/useGetServices";
import { getOrdersById } from "../../../queryhooks/admin/orders";
import {
  OrdersByIdResponse,
  ProductsEntity,
} from "../../../types/ordersByIdResponse";

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

  return (
    <>
      <Modal
        size="xl"
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
              <div className="flex flex-col gap-4 pt-4 pb-8">
                <div className="flex justify-between px-20 mt-4">
                  <span>نام مشتری</span>
                  <span>{`${data?.data.order?.user?.firstname} ${data?.data.order?.user?.lastname}`}</span>
                </div>
                <div className="flex justify-between px-20">
                  <span>آدرس</span>
                  <span>{data?.data.order?.user?.address}</span>
                </div>
                <div className="flex justify-between px-20">
                  <span>شماره تماس</span>
                  <span>{data?.data.order?.user?.phoneNumber}</span>
                </div>
                <div className="flex justify-between px-20">
                  <span>زمان تحویل</span>
                  <span>
                    {data?.data.order?.deliveryDate &&
                      new Date(
                        data?.data.order?.deliveryDate
                      ).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between px-20 mb-4">
                  <span>زمان سفارش</span>
                  <span>
                    {data?.data.order?.createdAt &&
                      new Date(data?.data.order?.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
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
                      <TableRow key={item.product._id}>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.product.price}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {data?.data.order?.deliveryStatus ? (
                  <div className="flex justify-between px-20">
                    <span>زمان تحویل</span>
                    <span>
                      {data?.data.order?.deliveryDate &&
                        new Date(
                          data?.data.order?.deliveryDate
                        ).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <Button
                      className="bg-persian-green text-white"
                      onClick={onClose}
                    >
                      تحویل شد
                    </Button>
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
