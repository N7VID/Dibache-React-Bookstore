import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartCard from "../../components/CartCard/CartCard";
import { PATHS } from "../../configs/paths.config";
import { RootContext } from "../../context/RootContextProvider";
import { toPersianNumber } from "../../utils/toPersianNumber";

export default function CartPage() {
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart } = context;

  return (
    <div className="LayoutContainer cursor-default py-8">
      {cart?.length === 0 ? (
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
        <div className="border-2 border-[#eee] rounded-lg flex justify-between p-4 gap-8 relative">
          <div className="rounded-lg p-4 flex flex-col justify-center gap-4 flex-grow">
            <div className="flex flex-col gap-1">
              <span>سبد خرید شما</span>
              <span className="text-key-gray text-sm">
                {toPersianNumber(cart.length)} کتاب
              </span>
            </div>
            {cart.map((item) => (
              <CartCard product={item.product} key={item.product.id} />
            ))}
          </div>
          <div>
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
                      قیمت کالاها <span>({toPersianNumber(cart.length)})</span>
                    </span>
                    <span>1</span>
                  </div>
                  <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm">
                    <span>جمع سبد خرید</span>
                    <span>6</span>
                  </div>
                  <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm text-persian-green">
                    <span>سود شما از خرید</span>
                    <span>5</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-persian-green text-white w-44 text-[13px] mobile:text-sm mobile:w-full"
                    variant="solid"
                    // onClick={() => handleAddCartButton(product._id)}
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
