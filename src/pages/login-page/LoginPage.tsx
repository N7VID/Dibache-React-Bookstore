import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { FormData, schema } from "./schema";

export default function LoginPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSubmitLogin: SubmitHandler<FormData> = (value) => {
    console.log(value);
  };
  return (
    <div className="LayoutContainer pt-36">
      <div className="bg-white sm:w-[400px] mx-auto rounded-lg border border-black py-12 cursor-default">
        <h2 className="sm:text-2xl xs:text-xl font-semibold text-center mb-14">
          ورود به حساب کاربری
        </h2>
        <form
          action=""
          className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-6"
          onSubmit={handleSubmit(handleSubmitLogin)}
        >
          <Input
            label={"نام کاربری"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["username"]}
            errorMessage={`${errors["username"]?.message}`}
            variant="bordered"
            {...register("username")}
          />
          <Input
            label={"گذرواژه"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            type="password"
            isInvalid={!!errors["password"]}
            errorMessage={`${errors["password"]?.message}`}
            variant="bordered"
            {...register("password")}
          />
          <Button
            className="bg-persian-green text-white text-base sm:text-lg w-44 xs:w-64 sm:w-full"
            type="submit"
          >
            ورود
          </Button>
        </form>
        <p className="text-center text-[#777] text-[10px] sm:text-[11px] mt-4 px-3">
          با ورود به <span className="text-persian-green">دیباچه</span>، شرایط و
          قوانین استفاده از خدمات را می‌پذیرید.
        </p>
        <p className="text-center text-[#777] text-[12px] sm:text-sm font-semibold mt-8">
          حساب کاربری ندارید؟{" "}
          <Link to={PATHS.REGISTER}>
            <span className="text-persian-green">ثبت نام</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
