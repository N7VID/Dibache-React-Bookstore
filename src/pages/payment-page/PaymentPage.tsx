import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import ArrowRightIcon from "../../assets/svg/ArrowRightIcon";
import { PATHS } from "../../configs/paths.config";
import PaymentBillCard from "./components/PaymentBillCard";
import PaymentForm from "./components/PaymentForm";
import PaymentCart from "./components/PaymentCart";

export default function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div className="LayoutContainer cursor-default py-6 font-yekan min-h-screen">
      <ScrollRestoration />
      <header className="border border-key-gray rounded-lg p-1 grid grid-cols-3 items-center">
        <div
          className="flex items-center gap-2 px-4 cursor-pointer w-fit"
          onClick={() => navigate(PATHS.CART)}
        >
          <ArrowRightIcon className="size-6" />
          <span className="font-semibold hidden mobile:block">
            آدرس و زمان ارسال
          </span>
        </div>
        <div className="flex justify-center items-center">
          <Link to={PATHS.HOME}>
            <img src="/Dibache-1.png" alt="Dibache-logo" className="w-24" />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-12 items-center py-4">
        <div className="col-span-12 laptop:col-span-6 laptop:col-start-1 laptop:col-end-9">
          <div className="flex justify-center items-center px-4 py-6 gap-8 flex-col border border-key-gray rounded-lg">
            <div className="grid grid-cols-1 tablet:grid-cols-3 w-full items-center gap-4 font-semibold">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/svg/user-black.svg"
                  alt="user"
                  className="size-5"
                />
                <p className="text-sm tablet:text-base">مشخصات خریدار</p>
              </div>
              <p className="flex justify-center items-center text-sm tablet:text-base">
                نهایی کردن خرید
              </p>
            </div>
            <PaymentForm />
          </div>
          <PaymentCart />
        </div>
        <section className="col-span-12 laptop:col-span-6 laptop:col-start-9 h-full">
          <PaymentBillCard />
        </section>
      </main>
    </div>
  );
}
