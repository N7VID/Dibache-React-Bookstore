import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostService } from "../../../../hooks/usePostService";
import { postCategories } from "../../../../queryhooks/admin/categories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { AddCategorySchema } from "./schema";

export default function AddCategoryForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddCategorySchema>();

  const { mutate, isPending } = usePostService<
    { name: string; icon: FileList },
    CategoriesResponse
  >({
    mutationKey: ["PostCategories"],
    mutationFn: postCategories,
  });

  const handleSubmitAddCategoryForm: SubmitHandler<AddCategorySchema> = (
    values: AddCategorySchema
  ) => {
    mutate(values);
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
        label={"آیکون (اختیاری)"}
        size="sm"
        type="file"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["icon"]}
        errorMessage={`${errors["icon"]?.message}`}
        variant="bordered"
        {...register("icon", { required: false })}
      />
      <Button
        className="bg-persian-green text-white text-base sm:text-lg w-44 xs:w-64 sm:w-full"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {!isPending && "افزودن"}
      </Button>
    </form>
  );
}
