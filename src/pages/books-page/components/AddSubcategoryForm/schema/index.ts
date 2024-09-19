import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "نام زیر مجموعه را وارد کنید."),
  category: z.string().min(1, "دسته بندی مربوط را انتخاب کنید."),
});

export type AddSubcategorySchema = z.infer<typeof schema>;
