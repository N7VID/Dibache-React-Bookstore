import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCategory } from "./schema";

export default function AddCategoryForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddCategory>();

  const handleSubmitAddCategoryForm: SubmitHandler<AddCategory> = (
    values: AddCategory
  ) => {
    console.log(values);
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2"
      onSubmit={handleSubmit(handleSubmitAddCategoryForm)}
    >
      <Input
        label={"نام دسته بندی"}
        size="sm"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["name"]}
        errorMessage={`${errors["name"]?.message}`}
        variant="bordered"
        {...register("name")}
      />
      <Input
        label={"تصویر"}
        size="sm"
        type="file"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["icon"]}
        errorMessage={`${errors["icon"]?.message}`}
        variant="bordered"
        {...register("icon")}
      />
      <Button
        className="bg-persian-green text-white text-base sm:text-lg w-44 xs:w-64 sm:w-full"
        type="submit"
        // isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {/* {!isPending && "ثبت نام"} */}
      </Button>
    </form>
  );
}
