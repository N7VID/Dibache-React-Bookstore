import { Link } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";

export default function PaymentResultPage() {
  const searchParams = new URLSearchParams(useLocation().search).get("status");

  return (
    <div className="LayoutContainer py-6 flex justify-center items-center cursor-default">
      {searchParams === "success" ? (
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
