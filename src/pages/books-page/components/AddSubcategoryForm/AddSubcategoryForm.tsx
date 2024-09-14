import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetServices } from "../../../../hooks/useGetServices";
import { usePostService } from "../../../../hooks/usePostService";
import { postSubCategories } from "../../../../queryhooks/admin/subCategory";
import { getCategories } from "../../../../queryhooks/getCategories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { AddSubcategorySchema, schema } from "./schema";

export default function AddSubcategoryForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddSubcategorySchema>({ resolver: zodResolver(schema) });

  const { mutate, isPending } = usePostService({
    mutationKey: ["PostSubcategories"],
    mutationFn: postSubCategories,
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
    console.log(values);

    mutate(values);
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2"
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
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>

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
