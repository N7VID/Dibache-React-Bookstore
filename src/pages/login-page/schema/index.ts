import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, "لطفا این قسمت را خالی نگذارید"),
  password: z
    .string()
    .min(1, "رمز عبور خود را وارد کنید")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد!"
    ),
});
export type FormData = z.infer<typeof schema>;
