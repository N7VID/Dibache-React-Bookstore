import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import { useContext } from "react";
import { RootContext } from "../../../context/RootContextProvider";

export default function PaymentBillCard() {
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, billData } = context;

  const totalBill = billData.reduce(
    (acc, curr) => {
      acc.discount += curr.discount;
      acc.endPrice += curr.endPrice;
      acc.totalPrice += curr.totalPrice;
      return acc;
    },
    {
      endPrice: 0,
      totalPrice: 0,
      discount: 0,
    }
  );

  function handleOrderButton() {
    window.open("http://localhost:7000/", "_self");
  }

  const discountPercent = Math.ceil(
    (totalBill.discount * 100) / totalBill.endPrice
  );
  return (
    <div className="flex justify-center laptop:justify-end mobile:min-w-[320px] min-w-[250px] sticky top-8 mt-4 laptop:mt-0">
      <Card shadow="sm" className="w-96">
        <CardHeader className="justify-center">
          <h4 className="text-persian-green py-2 mobile:text-[18px] text-sm">
            خرید کالای فیزیکی
          </h4>
        </CardHeader>
        <Divider className="bg-persian-green p-[0.8px]" />
        <CardBody>
          <div className="py-4">
            <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm">
              <span>
                قیمت کالاها{" "}
                <span>({toPersianNumber(cart.products.length)})</span>
              </span>
              <span>{toPersianNumber(totalBill.endPrice)} تومان</span>
            </div>
            <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm">
              <span>جمع سبد خرید</span>
              <span>{toPersianNumber(totalBill.totalPrice)} تومان</span>
            </div>
            <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm text-persian-green">
              <span>سود شما از خرید</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  ({toPersianNumber(discountPercent)}%)
                </span>
                <span>{toPersianNumber(totalBill.discount)} تومان</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-persian-green text-white w-44 text-[13px] mobile:text-sm mobile:w-full"
              variant="solid"
              isDisabled={!Object.keys(cart).includes("deliveryDate")}
              onClick={handleOrderButton}
            >
              ثبت سفارش
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
