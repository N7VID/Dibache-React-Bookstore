import { Link } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { RootContext } from "../../context/RootContextProvider";
import { usePostService } from "../../hooks/usePostService";
import { postOrders } from "../../queryhooks/orders";
import { toast } from "react-toastify";

export default function PaymentResultPage() {
  const paymentStatus = new URLSearchParams(useLocation().search).get("status");
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, setCart } = context;

  const { mutate } = usePostService({
    mutationKey: ["PostOrders"],
    mutationFn: postOrders,
    options: {
      onSuccess: () => {
        toast.success("سفارش شما ثبت گردید.");
        setCart({ products: [], user: "" });
        localStorage.removeItem("cart");
      },
      onError: (error) => {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  useEffect(() => {
    if (paymentStatus === "success" && cart.products.length > 0) {
      mutate(cart);
    }
  }, [paymentStatus, cart, mutate]);

  return (
    <div className="LayoutContainer py-6 flex justify-center items-center cursor-default">
      {paymentStatus === "success" ? (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/images/payment-success.jpg"
            alt="payment-success"
            className="w-96 mix-blend-multiply"
          />
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-semibold">
              پرداخت شما با <span className="text-green-600">موفقیت</span> انجام
              شد.
            </p>
            <p className="text-sm">
              بازگشت به <Link href={PATHS.HOME}>صفحه اصلی</Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/images/payment-failed.jpg"
            alt="payment-success"
            className="w-96 mix-blend-multiply"
          />
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-semibold">
              متاسفانه سفارش شما{" "}
              <span className="text-red-600">پرداخت نشد.</span>
            </p>
            <p className="text-sm">
              بازگشت به <Link href={PATHS.HOME}>صفحه اصلی</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
