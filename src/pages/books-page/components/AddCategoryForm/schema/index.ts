import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "نام دسته بندی را وارد کنید."),
  icon: z.string().min(1, "آیکون دسته بندی را انتخاب کنید."),
});

export type AddCategory = z.infer<typeof schema>;
