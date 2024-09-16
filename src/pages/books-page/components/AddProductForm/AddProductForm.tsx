import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import { useGetServices } from "../../../../hooks/useGetServices";
import { usePostService } from "../../../../hooks/usePostService";
import { postProducts } from "../../../../queryhooks/admin/products";
import { getCategories } from "../../../../queryhooks/getCategories";
import { getSubcategories } from "../../../../queryhooks/getSubcategories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { SubcategoriesResponse } from "../../../../types/subCategoriesResponse";
import { AddProduct } from "./schema";

export default function AddProductForm() {
  const [subCategoriesItem, setSubCategoriesItem] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    control,
  } = useForm<AddProduct>();

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubcategories"],
    queryFn: getSubcategories,
  });

  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const handleSubCategories = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const filteredSubcategories = subCategoryData?.data.subcategories
      ?.filter((item) => item.category === categoryId)
      .map((item) => ({ label: item.name, value: item._id }));
    setSubCategoriesItem(filteredSubcategories || []);
    setValue("category", categoryId);
  };

  const { mutate, isPending } = usePostService({
    mutationKey: ["PostProducts"],
    mutationFn: postProducts,
    invalidate: ["GetProducts"],
  });

  const handleSubmitProductForm: SubmitHandler<AddProduct> = (
    value: AddProduct
  ) => {
    mutate(value);
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2"
      onSubmit={handleSubmit(handleSubmitProductForm)}
    >
      <Input
        label={"نام"}
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
        onChange={handleSubCategories}
      >
        {categoriesItem?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="زیر مجموعه"
        size="sm"
        isDisabled={subCategoriesItem.length === 0}
        isInvalid={!!errors["subcategory"]}
        errorMessage={`${errors["subcategory"]?.message}`}
        variant="bordered"
        className="max-w-xs"
        {...register("subcategory")}
      >
        {subCategoriesItem?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        label={"انتشارات"}
        size="sm"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["brand"]}
        errorMessage={`${errors["brand"]?.message}`}
        variant="bordered"
        {...register("brand")}
      />
      <Input
        label={"تعداد"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["quantity"]}
        errorMessage={`${errors["quantity"]?.message}`}
        variant="bordered"
        {...register("quantity")}
      />
      <Input
        label={"قیمت واحد"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["price"]}
        errorMessage={`${errors["price"]?.message}`}
        variant="bordered"
        {...register("price")}
      />
      <Input
        label={"تخفیف"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["discount"]}
        errorMessage={`${errors["discount"]?.message}`}
        variant="bordered"
        {...register("discount")}
      />
      <Input
        label={"تصویر پیش نمایش"}
        size="sm"
        type="file"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["thumbnail"]}
        errorMessage={`${errors["thumbnail"]?.message}`}
        variant="bordered"
        {...register("thumbnail")}
      />
      <Input
        label={"تصاویر"}
        size="sm"
        multiple
        type="file"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["images"]}
        errorMessage={`${errors["images"]?.message}`}
        variant="bordered"
        {...register("images")}
      />
      <Controller
        control={control}
        name="description"
        defaultValue=""
        render={({ field }) => (
          <TextEditor value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}
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
