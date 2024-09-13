import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export default function AddSubcategoryForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

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
        items={[{ label: "hi" }, { label: "hello" }]}
        label="دسته بندی"
        size="sm"
        isInvalid={!!errors["category"]}
        errorMessage={`${errors["category"]?.message}`}
        variant="bordered"
        className="max-w-xs"
        {...register("category")}
      >
        {(example) => (
          <SelectItem key={example.label}>{example.label}</SelectItem>
        )}
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
