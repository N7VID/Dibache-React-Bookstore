import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeSlashFilledIcon } from "../../assets/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/svg/EyeFillesIcon";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import { useState } from "react";
import { RegisterFormData, schema } from "./schema";
import { usePostService } from "../../hooks/usePostService";
import { postRegisterData } from "../../queryhooks/auth";
import { AxiosError } from "axios";
import { authResponse } from "../../types/authResponse";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface ResponseMessage {
  status: string;
  message: string;
}

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const { mutate, isPending } = usePostService({
    mutationFn: postRegisterData,
    mutationKey: ["Register"],
  });

  const handleSubmitRegister: SubmitHandler<RegisterFormData> = (
    value: RegisterFormData
  ) => {
    mutate(value, {
      onSuccess: (response) => {
        const res = response as authResponse;
        Cookies.set("accessToken", res.token.accessToken);
        Cookies.set("refreshToken", res.token.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate(PATHS.HOME);
        toast.success(
          `${res.data.user.firstname} ${res.data.user.lastname} عزیز خوش آمدید!`
        );
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
    <div className="LayoutContainer flex items-center min-h-[calc(100vh-25px)] justify-center pt-24 pb-4">
      <div className="bg-white sm:w-[400px] mx-auto rounded-lg border border-black py-8 cursor-default">
        <h2 className="sm:text-xl font-semibold text-center mb-6">
          ثبت‌نام و ساخت حساب کاربری
        </h2>
        <form
          action=""
          className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2"
          onSubmit={handleSubmit(handleSubmitRegister)}
        >
          <Input
            label={"نام"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["firstname"]}
            errorMessage={`${errors["firstname"]?.message}`}
            variant="bordered"
            {...register("firstname")}
          />
          <Input
            label={"نام خانوادگی"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["lastname"]}
            errorMessage={`${errors["lastname"]?.message}`}
            variant="bordered"
            {...register("lastname")}
          />
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
            label={"شماره همراه"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["phoneNumber"]}
            errorMessage={`${errors["phoneNumber"]?.message}`}
            variant="bordered"
            {...register("phoneNumber")}
          />
          <Input
            label={"آدرس"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["address"]}
            errorMessage={`${errors["address"]?.message}`}
            variant="bordered"
            {...register("address")}
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
            {!isPending && "ثبت نام"}
          </Button>
        </form>
        <p className="text-center text-[#777] text-[10px] sm:text-[11px] mt-4 px-3">
          با ثبت‌نام در <span className="text-persian-green">دیباچه</span>،
          شرایط و قوانین استفاده از خدمات را می‌پذیرید.
        </p>
        <p className="text-center text-[#777] text-[12px] sm:text-sm font-semibold mt-4">
          پیشتر عضو شده‌اید؟{" "}
          <Link to={PATHS.LOGIN}>
            <span className="text-persian-green">ورود</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
