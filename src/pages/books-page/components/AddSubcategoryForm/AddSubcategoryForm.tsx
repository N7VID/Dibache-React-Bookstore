import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetServices } from "../../../../hooks/useGetServices";
import { usePostService } from "../../../../hooks/usePostService";
import { postSubCategories } from "../../../../queryhooks/admin/subCategories";
import { getCategories } from "../../../../queryhooks/getCategories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { AddSubcategorySchema, schema } from "./schema";
import { toast } from "react-toastify";

export default function AddSubcategoryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AddSubcategorySchema>({ resolver: zodResolver(schema) });

  const { mutate, isPending } = usePostService({
    mutationKey: ["PostSubcategories"],
    mutationFn: postSubCategories,
    options: {
      onSuccess() {
        onClose();
        reset();
        toast.success(`زیر مجموعه با موفقیت اضافه شد.`);
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const handleSubmitSubcategoryForm: SubmitHandler<AddSubcategorySchema> = (
    values: AddSubcategorySchema
  ) => {
    mutate(values);
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
      onSubmit={handleSubmit(handleSubmitSubcategoryForm)}
    >
      <Input
        label={"نام زیرمحموعه"}
        size="sm"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["name"]}
        errorMessage={`${errors["name"]?.message}`}
        variant="bordered"
        {...register("name")}
      />
      <Select
        label="دسته بندی"
        size="sm"
        isInvalid={!!errors["category"]}
        errorMessage={`${errors["category"]?.message}`}
        variant="bordered"
        className="max-w-xs"
        {...register("category")}
      >
        {categoriesItem?.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="font-yekan"
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>

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
