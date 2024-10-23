import { Input, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { User } from "../../types/authResponse";
import { PATHS } from "../../configs/paths.config";

export default function ProfilePage() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role === "ADMIN" ? "ادمین" : "کاربر";
  const hasAccess = user.role === "ADMIN";
  const defaultValues = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    phoneNumber: user.phoneNumber,
    role,
    address: user.address,
  };
  const { register } = useForm({ defaultValues });

  return (
    <div className="flex justify-center items-center">
      <form
        action=""
        className="flex flex-col items-center gap-3 mt-6 bg-white shadow-box px-4 tablet:px-12 py-8 rounded-lg border-2 w-[200px] mobile:w-[350px]"
      >
        <img
          src="/src/assets/images/user.bmp"
          alt="user-default-profile-image"
          className="w-16 rounded-full"
        />
        <Input
          size="sm"
          isReadOnly
          label="نام"
          variant="underlined"
          {...register("firstname")}
        />
        <Input
          size="sm"
          isReadOnly
          label="نام خانوادگی"
          variant="underlined"
          {...register("lastname")}
        />
        <Input
          size="sm"
          isReadOnly
          label="نام کاربری"
          variant="underlined"
          {...register("username")}
        />
        <Input
          size="sm"
          isReadOnly
          label="شماره تماس"
          variant="underlined"
          {...register("phoneNumber")}
        />
        {hasAccess && (
          <Input
            size="sm"
            isReadOnly
            label="سطح دسترسی"
            variant="underlined"
            {...register("role")}
          />
        )}
        <Input
          size="sm"
          isReadOnly
          label="آدرس"
          variant="underlined"
          {...register("address")}
        />
        <Link href={PATHS.HOME} className="pt-4 text-sm mobile:text-base">
          بازگشت به خانه
        </Link>
      </form>
    </div>
  );
}
