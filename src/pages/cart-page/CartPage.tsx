import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useContext } from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import CartCard from "../../components/CartCard/CartCard";
import { PATHS } from "../../configs/paths.config";
import { RootContext } from "../../context/RootContextProvider";
import { toPersianNumber } from "../../utils/toPersianNumber";
import BookIcon from "../../assets/svg/BookIcon";

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
      {cart?.products?.length === 0 ? (
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
        <div className="border-t-2 border-[#eee] flex justify-between p-4 gap-8 relative">
          <div className="rounded-lg p-4 flex flex-col justify-center gap-8 flex-grow max-w-[820px]">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">سبد خرید شما</span>
              <span className="text-key-gray text-sm flex gap-2 items-center">
                <BookIcon />
                {toPersianNumber(+cart?.products?.length)} کتاب
              </span>
            </div>
            {cart?.products?.map((item) => (
              <CartCard product={item} key={item.id} />
            ))}
          </div>
          <div className="min-w-[320px]">
            <Card shadow="sm">
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
                      <span>({toPersianNumber(+cart?.products?.length)})</span>
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
                    onClick={() => navigate(PATHS.PAYMENT)}
                  >
                    تایید و تکمیل سفارش
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
