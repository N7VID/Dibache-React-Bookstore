import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import XCircleIcon from "../../../../assets/svg/XCircleIcon";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import { useGetServices } from "../../../../hooks/useGetServices";
import { usePostService } from "../../../../hooks/usePostService";
import { postProducts } from "../../../../queryhooks/admin/products";
import { getCategories } from "../../../../queryhooks/getCategories";
import { getSubcategories } from "../../../../queryhooks/getSubcategories";
import { CategoriesResponse } from "../../../../types/categoriesResponse";
import { SubcategoriesResponse } from "../../../../types/subCategoriesResponse";
import { AddProduct, schema } from "./schema";

export default function AddProductForm({ onClose }: { onClose: () => void }) {
  const [subCategoriesItem, setSubCategoriesItem] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
    resetField,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<AddProduct>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      brand: "",
    },
  });

  const fileInputThumbnailRef = useRef<HTMLInputElement>(null);

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubcategories"],
    queryFn: () => getSubcategories({ limit: 0 }),
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

  const { mutate, isPending } = usePostService({
    mutationKey: ["PostProducts"],
    mutationFn: postProducts,
    invalidate: ["GetProducts"],
    options: {
      onSuccess() {
        onClose();
        reset();
        toast.success(`کتاب با موفقیت اضافه شد.`);
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  const handleSubmitProductForm: SubmitHandler<AddProduct> = (
    value: AddProduct
  ) => {
    mutate(value);
  };

  function handleDeleteThumbnail() {
    setSelectedThumbnail("");
    resetField("thumbnail");
  }

  const handleDeleteImages = (image: string) => {
    const indx = selectedImages.findIndex((value) => value === image);
    setValue(
      "images",
      [...watch("images")].filter((_, index) => index !== indx)
    );
    setSelectedImages((prevImages) =>
      prevImages.filter((value) => value !== image)
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedImages([]);
      const imagesPreview: string[] = [];
      const fileReaders: FileReader[] = [];

      fileArray.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);

        fileReader.onload = (e) => {
          const result = e.target?.result;
          if (result) {
            imagesPreview.push(result as string);
          }

          if (imagesPreview.length === fileArray.length) {
            setSelectedImages(imagesPreview);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  return (
    <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
      onSubmit={handleSubmit(handleSubmitProductForm, () => {
        if (!errors.images?.message) {
          clearErrors("images");
          clearErrors("thumbnail");
        }
        if (!watch("images") || !watch("images").length) {
          setError("images", {
            type: "required",
            message: "فایل را انتخاب کنید.",
          });
          setError("thumbnail", {
            type: "required",
            message: "فایل را انتخاب کنید.",
          });
        }
      })}
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
        {...register("category", { onChange: handleSubCategories })}
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
        isDisabled={subCategoriesItem.length === 0}
        isInvalid={!!errors["subcategory"]}
        errorMessage={`${errors["subcategory"]?.message}`}
        variant="bordered"
        className="max-w-xs"
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
      <div className="flex flex-col w-full mb-4">
        <div className="w-44 xs:w-64 sm:w-full flex items-center relative h-12">
          <Input
            label={"تصویر پیش نمایش"}
            size="sm"
            type="file"
            className="opacity-0 w-full h-full z-10"
            isInvalid={!!errors["thumbnail"]}
            errorMessage={`${errors["thumbnail"]?.message}`}
            variant="bordered"
            {...register("thumbnail", {
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedThumbnail(URL.createObjectURL(file));
                  setValue("thumbnail", file);
                }
              },
            })}
            ref={fileInputThumbnailRef}
          />
          <Button
            variant="bordered"
            radius="sm"
            className="absolute top-3 left-0 w-full h-8 z-20"
            onClick={() => {
              fileInputThumbnailRef.current?.click();
            }}
          >
            انتخاب تصویر پیش نمایش
          </Button>
        </div>
        {selectedThumbnail && (
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]">تصویر بارگزاری شده</span>
            <div className="relative">
              <XCircleIcon
                className="size-6 cursor-pointer text-[#f31260] absolute top-0 left-0"
                onClick={handleDeleteThumbnail}
              />
              <img
                src={selectedThumbnail}
                alt="thumbnail-preview"
                className="rounded-md w-32"
              />
            </div>
          </div>
        )}
        {errors.images?.message && (
          <p className="text-[#f31260] text-[12px]">
            {errors.images?.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mb-4 -mt-6">
        <div className="w-44 xs:w-64 sm:w-full flex items-center relative h-12">
          <Input
            label={"تصاویر"}
            size="sm"
            multiple
            id="imagesInp"
            type="file"
            className="opacity-0 w-full h-full z-10"
            isInvalid={!!errors["images"]}
            errorMessage={`${errors["images"]?.message}`}
            variant="bordered"
            {...register("images")}
            onChange={(e) => {
              register("images").onChange(e);
              handleFileChange(e);
            }}
          />
          <Button
            variant="bordered"
            radius="sm"
            className="absolute top-3 left-0 w-full h-8 z-20"
            onClick={() => {
              const fileInput = document.querySelector(
                "#imagesInp"
              ) as HTMLInputElement;
              fileInput?.click();
            }}
          >
            انتخاب تصاویر
          </Button>
        </div>
        {selectedImages.length > 0 && (
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]">تصویر بارگزاری شده</span>
            <div className="flex items-center justify-between gap-2 overflow-x-auto">
              {selectedImages.map((image, index) => (
                <div className="relative flex-shrink-0" key={index}>
                  <XCircleIcon
                    className="size-6 cursor-pointer text-[#f31260] absolute top-0 left-0"
                    onClick={() => handleDeleteImages(image)}
                  />
                  <img
                    src={image}
                    alt="image-preview"
                    className="rounded-md w-32"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {errors.images?.message && (
          <p className="text-[#f31260] text-[12px]">
            {errors.images?.message as string}
          </p>
        )}
      </div>
      <div className="w-full">
        <Controller
          control={control}
          name="description"
          defaultValue=""
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
          {!isPending && "افزودن"}
        </Button>
      </div>
    </form>
  );
}
