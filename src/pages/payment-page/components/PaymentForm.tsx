import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { RootContext } from "../../../context/RootContextProvider";
import PaymentInput from "./PaymentInput";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PaymentForm() {
  const user = localStorage.getItem("user");
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, setCart } = context;

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

  const dayOfMonth = parseInt(
    new Date().toLocaleDateString("fa-IR-u-nu-latn", { day: "numeric" })
  );

  return (
    <form
      className="grid grid-cols-1 tablet:grid-cols-4 gap-3 px-8"
      onSubmit={handleSubmit(handleSubmitBill)}
    >
      <PaymentInput
        label={"نام خریدار"}
        register={register}
        name={"firstName"}
      />
      <PaymentInput
        label={"نام خانوادگی"}
        register={register}
        name={"lastName"}
      />
      <PaymentInput
        label={"شماره تماس"}
        register={register}
        name={"phoneNumber"}
        className={"tablet:col-start-3 tablet:col-end-5"}
      />
      <PaymentInput
        label={"آدرس تحویل سفارش"}
        register={register}
        name={"address"}
        className={"tablet:col-start-1 tablet:col-end-4"}
      />
      <div className="flex flex-col w-44 sm:w-56 tablet:w-full">
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
                  height: "55px",
                  width: "100%",
                  borderRadius: "10px",
                  fontSize: "16px",
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
                calendarPosition="bottom-center"
                minDate={new DateObject({ calendar: persian }).set(
                  "day",
                  dayOfMonth
                )}
              />
              {errors && errors[name] && errors[name].type === "required" && (
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
  );
}
