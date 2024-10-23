/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@nextui-org/react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: any;
  register: UseFormRegister<{
    firstName: any;
    lastName: any;
    phoneNumber: any;
    address: any;
    deliveryDate: string;
  }>;
  className?: string;
}

export default function PaymentInput({
  label,
  name,
  register,
  className,
}: Props) {
  return (
    <Input
      label={label}
      className={`w-44 sm:w-56 tablet:w-full ${className}`}
      isReadOnly
      variant="bordered"
      {...register(name)}
    />
  );
}
