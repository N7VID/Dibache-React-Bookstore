import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, "لطفا این قسمت را خالی نگذارید"),
  password: z
    .string()
    .min(8, "رمز عبور می بایست حداقل شامل هشت کاراکتر باشد")

    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد!"
    ),
  firstname: z.string().min(1, "نام خود را وارد کنید."),
  lastname: z.string().min(1, "نام خانوادگی خود را وارد کنید"),
  address: z.string().min(1, "آدرس خود را وارد کنید"),
  phoneNumber: z
    .string()
    .min(1, "شماره همراه خود را وارد کنید")
    .regex(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "شماره همراه معتبر نمی باشد"
    ),
});
export type RegisterFormData = z.infer<typeof schema>;
