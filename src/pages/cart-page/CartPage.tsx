import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useContext } from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import TruckIcon from "../../assets/svg/TruckIconIcon";
import CartCard from "../../components/CartCard/CartCard";
import { PATHS } from "../../configs/paths.config";
import { RootContext } from "../../context/RootContextProvider";
import { toPersianNumber } from "../../utils/toPersianNumber";

export default function CartPage() {
  const context = useContext(RootContext);
  const navigate = useNavigate();
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

  const discountPercent = Math.ceil(
    (totalBill.discount * 100) / totalBill.endPrice
  );

  return (
    <div className="LayoutContainer cursor-default py-8">
      <ScrollRestoration />
      {cart?.products?.length === 0 || !cart.products ? (
        <div className="border-2 border-[#eee] rounded-lg flex flex-col items-center justify-center gap-4 py-12 px-4">
          <img src="/src/assets/svg/empty-cart.svg" alt="empty-cart" />
          <div className="flex flex-col justify-center items-center gap-1 text-center">
            <p className="text-base mobile:text-lg font-semibold">
              سبد خرید شما خالی است!
            </p>
            <p className="text-sm mobile:text-base text-value-gray">
              می توانید برای مشاهده محصولات به{" "}
              <span className="text-persian-green">
                <Link to={PATHS.HOME}>صفحه اصلی</Link>
              </span>{" "}
              بروید
            </p>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col justify-between lg:items-start items-center lg:p-4 gap-4 relative">
          <div className="rounded-lg lg:px-4 flex flex-col justify-center gap-8 sm:gap-4 flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 border-y p-4">
              <h2 className="text-xl text-value-gray font-semibold">
                سبد خرید شما
              </h2>{" "}
              <span className="text-key-gray text-sm font-semibold">
                {toPersianNumber(+cart?.products?.length)} کتاب موجود در سبد
                خرید
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#f2f2f2] border rounded-lg p-3">
              <TruckIcon className="size-6 scale-x-[-1] text-value-gray" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-value-gray">
                  دریافت رایگان مرسوله‌های پیک دیباچه
                </span>
                <span className="text-[12px] text-key-gray">
                  برای خریدهای بالای ۱ میلیون تومان در شهر محل سکونت شما
                </span>
              </div>
            </div>
            {cart?.products?.map((item) => (
              <CartCard product={item} key={item.product} />
            ))}
          </div>
          <div className="min-w-[320px] mobile:min-w-[350px] w-[350px] sticky top-36 h-full flex flex-col gap-2 items-center lg:px-0">
            <Card shadow="sm" className="sm:w-full w-[270px]">
              <CardHeader className="justify-center">
                <h4 className="text-persian-green py-2 mobile:text-[18px] text-base">
                  خرید کالای فیزیکی
                </h4>
              </CardHeader>
              <Divider className="bg-persian-green p-[0.8px]" />
              <CardBody>
                <div className="py-4 flex flex-col sm:gap-0 gap-2">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-16 items-center justify-between px-4 py-2 text-sm">
                    <span>
                      قیمت کالاها{" "}
                      <span>({toPersianNumber(+cart?.products?.length)})</span>
                    </span>
                    <span>{toPersianNumber(totalBill.endPrice)} تومان</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-16 items-center justify-between px-4 py-2 text-sm">
                    <span>جمع سبد خرید</span>
                    <span>{toPersianNumber(totalBill.totalPrice)} تومان</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-16 items-center justify-between px-4 py-2 text-sm text-persian-green">
                    <span>سود شما از خرید</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        ({toPersianNumber(discountPercent)}%)
                      </span>
                      <span>{toPersianNumber(totalBill.discount)} تومان</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-2 sm:py-0">
                  <Button
                    className="bg-persian-green text-white w-44 text-[13px] mobile:text-sm mobile:w-full"
                    variant="solid"
                    onClick={() => navigate(PATHS.PAYMENT)}
                  >
                    تایید و تکمیل سفارش
                  </Button>
                </div>
              </CardBody>
            </Card>
            <span className="text-[11px] text-key-gray sm:w-[320px] w-[270px]">
              هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها
              از سبد حذف می‌شوند
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
