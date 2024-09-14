import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import { AddProduct, schema } from "./schema";
import { useGetServices } from "../../../../hooks/useGetServices";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { getCategories } from "../../../../queryhooks/admin/products";

export default function AddProductForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddProduct>();

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const handleSubmitProductForm: SubmitHandler<AddProduct> = (
    value: AddProduct
  ) => {
    console.log(value);
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
        onChange={(e) => console.log(e.target.value)}
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
        type="file"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["images"]}
        errorMessage={`${errors["images"]?.message}`}
        variant="bordered"
        {...register("images")}
      />
      <TextEditor />
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
