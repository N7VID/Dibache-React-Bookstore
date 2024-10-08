import { Button, Input } from "@nextui-org/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "../../assets/svg/ArrowRightIcon";
import { PATHS } from "../../configs/paths.config";

export default function PaymentPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

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
      deliveryDate: "",
    },
  });

  function handleSubmitBill(value) {
    const formattedDate = new Date(value?.deliveryDate).toISOString();
    console.log(formattedDate);
  }

  return (
    <div className="LayoutContainer cursor-default py-6 font-yekan min-h-screen">
      <header className="border border-key-gray rounded-lg p-1 grid grid-cols-3 items-center">
        <div
          className="flex items-center gap-2 px-4 cursor-pointer w-fit"
          onClick={() => navigate(-1)}
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
          <div className="flex justify-center items-start p-4 gap-4 flex-col border border-key-gray rounded-lg">
            <div className="flex flex-col items-center gap-4">
              <p>نهایی کردن خرید</p>
              <p className="text-sm font-semibold">مشخصات خریدار</p>
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
          <div className="flex justify-center items-start p-4 gap-4 flex-col border border-key-gray rounded-lg mt-3">
            سبد خرید
          </div>
        </div>
        <div className="col-span-6 col-start-9">
          <div className="flex justify-center items-center border border-key-gray rounded-lg">
            hi
          </div>
        </div>
      </main>
    </div>
  );
}
