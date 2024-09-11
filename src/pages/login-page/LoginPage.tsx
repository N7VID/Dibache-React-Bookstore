import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { usePostService } from "../../hooks/usePostService";
import { FormData, schema } from "./schema";
import { login } from "../../api/login.api";
import { AxiosError } from "axios";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../../assets/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/svg/EyeFillesIcon";

interface ResponseMessage {
  status: string;
  message: string;
}

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate, isPending } = usePostService({
    mutationFn: login,
    mutationKey: ["Login"],
    invalidate: [""],
  });

  const handleSubmitLogin: SubmitHandler<FormData> = (value: FormData) => {
    mutate(value, {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        const e = error as AxiosError<ResponseMessage>;
        console.log(e?.response?.data?.message);
      },
      onSettled: () => {
        reset();
      },
    });
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
            className="w-44 xs:w-64 sm:w-full relative"
            type={isVisible ? "text" : "password"}
            isInvalid={!!errors["password"]}
            errorMessage={`${errors["password"]?.message}`}
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none absolute top-3 left-3"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            {...register("password")}
          />
          <Button
            className="bg-persian-green text-white text-base sm:text-lg w-44 xs:w-64 sm:w-full"
            type="submit"
            isLoading={isPending}
            spinner={<Spinner color="default" size="sm" />}
          >
            {!isPending && "ورود"}
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
