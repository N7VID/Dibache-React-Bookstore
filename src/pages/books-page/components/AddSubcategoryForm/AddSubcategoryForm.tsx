import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useGetServices } from "../../../../hooks/useGetServices";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { getCategories } from "../../../../queryhooks/getCategories";

export default function AddSubcategoryForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const handleSubmitSubcategoryForm = (values) => {
    console.log(values);
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
        // isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {/* {!isPending && "ثبت نام"} */}
      </Button>
    </form>
  );
}
