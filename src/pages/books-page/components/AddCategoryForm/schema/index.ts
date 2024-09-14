import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "نام دسته بندی را وارد کنید."),
  icon: z.optional(z.any()),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
