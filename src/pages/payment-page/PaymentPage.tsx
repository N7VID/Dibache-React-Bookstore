import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "../../assets/svg/ArrowRightIcon";
import { PATHS } from "../../configs/paths.config";
import { toPersianNumber } from "../../utils/toPersianNumber";
import { useContext } from "react";
import { RootContext } from "../../context/RootContextProvider";
import ShoppingCart from "../../assets/svg/ShoppingCartIcon";

export default function PaymentPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, billData, setCart } = context;

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

  let person = [];
  if (user) {
    person = JSON.parse(user);
  }
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      firstName: person?.firstname,
      lastName: person?.lastname,
      phoneNumber: person.phoneNumber,
      address: person.address,
      deliveryDate: cart.deliveryDate || "",
    },
  });

  function handleSubmitBill(value: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    deliveryDate: string;
  }) {
    const formattedDate = new Date(value?.deliveryDate).toISOString();
    const updatedCart = { ...cart, deliveryDate: formattedDate };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function handleOrderButton() {
    window.open("http://localhost:7000/", "_blank");
  }

  return (
    <div className="LayoutContainer cursor-default py-6 font-yekan min-h-screen">
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
        <div className="col-span-6 col-start-1 col-end-8">
          <div className="flex justify-center items-start px-4 py-8 gap-8 flex-col border border-key-gray rounded-lg">
            <div className="grid grid-cols-3 w-full items-center gap-4 font-semibold">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/svg/user-black.svg"
                  alt="user"
                  className="size-5"
                />
                <p className="text-sm">مشخصات خریدار</p>
              </div>
              <p className="flex justify-center items-center">
                نهایی کردن خرید
              </p>
            </div>
            <form
              action=""
              className="grid grid-cols-3 gap-3"
              onSubmit={handleSubmit(handleSubmitBill)}
            >
              <Input
                label={"نام خریدار"}
                size="sm"
                className="w-44 xs:w-64 sm:w-full"
                isReadOnly
                variant="bordered"
                {...register("firstName")}
              />
              <Input
                label={"نام خانوادگی"}
                size="sm"
                className="w-44 xs:w-64 sm:w-full"
                isReadOnly
                variant="bordered"
                {...register("lastName")}
              />
              <Input
                label={"شماره تماس"}
                size="sm"
                className="w-44 xs:w-64 sm:w-full"
                isReadOnly
                variant="bordered"
                {...register("phoneNumber")}
              />
              <Input
                label={"آدرس تحویل سفارش"}
                size="sm"
                className="w-44 xs:w-96 sm:w-full col-start-1 col-end-3"
                isReadOnly
                variant="bordered"
                {...register("address")}
              />
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="deliveryDate"
                  rules={{
                    required: {
                      message: "تاریخ ارسال را انتخاب کنید",
                      value: true,
                    },
                  }}
                  render={({
                    field: { onChange, name, value },
                    formState: { errors },
                  }) => (
                    <>
                      <DatePicker
                        style={{
                          height: "47px",
                          width: "100%",
                          borderRadius: "8px",
                          fontSize: "14px",
                          padding: "3px 10px",
                          borderColor: "#D9D9D9",
                          borderWidth: "2px",
                        }}
                        format={"YYYY/MM/DD"}
                        placeholder="زمان ارسال"
                        value={value}
                        onChange={(date) => onChange(date?.isValid ? date : "")}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      {errors &&
                        errors[name] &&
                        errors[name].type === "required" && (
                          <span className="text-[10px] px-2 pt-1 -mb-[19px] text-[#FF4C6A]">
                            {errors[name].message}
                          </span>
                        )}
                    </>
                  )}
                />
              </div>
              <Button className="bg-persian-green text-white" type="submit">
                تایید اطلاعات
              </Button>
            </form>
          </div>
          <div className="flex justify-center items-start px-4 py-8 gap-8 flex-col border border-key-gray rounded-lg mt-3">
            <div className="flex items-center gap-3 font-semibold text-sm">
              <ShoppingCart />
              <span>سبد خرید</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {billData.map((item) => (
                <div key={item.id}>
                  <Link to={`/book/${item.id}`}>
                    <img
                      src={`http://${item.image}`}
                      alt={item.id}
                      className="w-24"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-6 col-start-9 mb-60">
          <div className="flex justify-end min-w-[320px]">
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
                    <span>{toPersianNumber(totalBill.totalPrice)} تومان</span>
                  </div>
                  <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm">
                    <span>جمع سبد خرید</span>
                    <span>{toPersianNumber(totalBill.endPrice)} تومان</span>
                  </div>
                  <div className="flex items-center gap-16 justify-between px-4 py-2 text-sm text-persian-green">
                    <span>سود شما از خرید</span>
                    <span>{toPersianNumber(totalBill.discount)} تومان</span>
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
        </div>
      </main>
    </div>
  );
}
