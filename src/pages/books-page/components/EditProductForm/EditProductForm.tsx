/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import { RootContext } from "../../../../context/RootContextProvider";
import { useGetServices } from "../../../../hooks/useGetServices";
import { usePatchServices } from "../../../../hooks/usePatchServices";
import { patchProducts } from "../../../../queryhooks/admin/products";
import { getCategories } from "../../../../queryhooks/getCategories";
import { getSubcategories } from "../../../../queryhooks/getSubcategories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { SubcategoriesResponse } from "../../../../types/subCategoriesResponse";
import { EditProduct, schema } from "./schema";

interface Params {
  onClose: () => void;
}

export default function EditProductForm({ onClose }: Params) {
  const [subCategoriesItem, setSubCategoriesItem] = useState<
    { label: string; value: string }[]
  >([]);

  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { selectedItemEditForm } = context;
  const { item } = selectedItemEditForm;

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
    setValue,
    watch,
  } = useForm<EditProduct>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name,
      brand: item?.brand,
      quantity: item?.quantity,
      price: item?.price,
      discount: item?.discount,
    },
  });

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubcategories"],
    queryFn: () => getSubcategories({ limit: 0 }),
  });

  useEffect(() => {
    if (categoryData && subCategoryData && item) {
      setValue("category", item?.category._id);
      setValue("subcategory", item?.subcategory._id);
      const filteredSubcategories = subCategoryData?.data.subcategories
        ?.filter((categoryItem) => categoryItem.category === item.category._id)
        .map((item) => ({ label: item.name, value: item._id }));
      setSubCategoriesItem(filteredSubcategories || []);
    }
  }, [item, categoryData, subCategoryData]);

  const { mutate, isPending } = usePatchServices({
    mutationKey: ["PatchProducts"],
    mutationFn: patchProducts,
    invalidate: ["GetProducts"],
    options: {
      onSuccess: () => {
        toast.success(`کتاب مورد نظر با موفقیت ویرایش شد.`);
        reset();
        onClose();
      },
      onError: (error) => {
        toast.success(error.message, { rtl: false });
      },
    },
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
    return categoryId;
  };

  const handleSubmitProductForm: SubmitHandler<EditProduct> = (
    value: EditProduct
  ) => {
    if (item) {
      mutate({ data: value, id: item._id });
    }
  };
  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
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
        value={watch("category")}
        selectedKeys={[watch("category")]}
        {...register("category", {
          onChange: handleSubCategories,
        })}
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
      <Select
        label="زیر مجموعه"
        size="sm"
        isInvalid={!!errors["subcategory"]}
        errorMessage={`${errors["subcategory"]?.message}`}
        variant="bordered"
        className="max-w-xs"
        value={watch("subcategory")}
        selectedKeys={[watch("subcategory")]}
        {...register("subcategory")}
      >
        {subCategoriesItem?.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="font-yekan"
          >
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
        {...register("quantity", { valueAsNumber: true })}
      />
      <Input
        label={"قیمت واحد"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["price"]}
        errorMessage={`${errors["price"]?.message}`}
        variant="bordered"
        {...register("price", { valueAsNumber: true })}
      />
      <Input
        label={"تخفیف"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["discount"]}
        errorMessage={`${errors["discount"]?.message}`}
        variant="bordered"
        {...register("discount", { valueAsNumber: true })}
      />
      <div className="flex flex-col justify-center items-center w-full">
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
        <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
          <span className="text-[10px]">تصویر بارگزاری شده</span>
          <img
            src={`http://localhost:8000/images/products/thumbnails/${item?.thumbnail}`}
            alt="thumbnail-preview"
            className="rounded-md w-32"
          />
        </div>
      </div>
      <div className="flex flex-col w-full mb-4">
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
        <div className="flex border-2 border-[#e0e0e0] rounded-md w-full justify-center flex-col items-center gap-1 py-1">
          <span className="text-[10px]">تصاویر بارگزاری شده</span>
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {item?.images?.map((image) => (
              <img
                key={image}
                src={`http://${image}`}
                alt="thumbnail-preview"
                className="rounded-md w-20"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Controller
          control={control}
          name="description"
          defaultValue={item?.description}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}
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
          {!isPending && "ویرایش"}
        </Button>
      </div>
    </form>
  );
}
