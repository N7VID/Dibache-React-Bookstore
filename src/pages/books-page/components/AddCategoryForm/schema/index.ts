import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "نام دسته بندی را وارد کنید."),
  icon: z.instanceof(File).refine((file) => file.size < 0, {
    message: "آیکون دسته بندی را انتخاب کنید.",
  }),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
