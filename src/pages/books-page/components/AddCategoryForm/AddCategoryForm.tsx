import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostService } from "../../../../hooks/usePostService";
import { postCategories } from "../../../../queryhooks/admin/categories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { addCategorySchema, AddCategorySchema } from "./schema";
import { toast } from "react-toastify";

export default function AddCategoryForm({ onClose }: { onClose: () => void }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AddCategorySchema>({ resolver: zodResolver(addCategorySchema) });

  const { mutate, isPending } = usePostService<
    { name: string; icon?: FileList },
    CategoriesResponse
  >({
    mutationKey: ["PostCategories"],
    mutationFn: postCategories,
    options: {
      onSuccess() {
        onClose();
        reset();
        toast.success(`دسته بندی با موفقیت اضافه شد.`);
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  const handleSubmitAddCategoryForm: SubmitHandler<AddCategorySchema> = (
    values: AddCategorySchema
  ) => {
    mutate(values);
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
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
      <div className="flex gap-3 mt-6 w-full">
        <Button
          className="text-base sm:text-lg w-full"
          variant="bordered"
          color="danger"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          انصراف
        </Button>
        <Button
          className="bg-persian-green text-white text-base sm:text-lg w-full"
          type="submit"
          isLoading={isPending}
          spinner={<Spinner color="default" size="sm" />}
        >
          {!isPending && "افزودن"}
        </Button>
      </div>
    </form>
  );
}
