import { z } from "zod";

const fileListSchema = z
  .instanceof(FileList)
  .refine((files) => files.length > 0, {
    message: "فایل را انتخاب کنید.",
  });

export const schema = z.object({
  name: z.string().min(1, "نام کتاب را وارد کنید."),
  category: z.string().min(1, "دسته بندی کتاب را انتخاب کنید."),
  subcategory: z.string().min(1, "زیر مجموعه کتاب را انتخاب کنید."),
  brand: z.string().min(1, "نام انتشارات کتاب را وارد کنید."),
  quantity: z
    .number({ message: "تعداد موجودی کتاب را وارد کنید." })
    .min(0, "تعداد موجودی کتاب را وارد کنید"),
  price: z
    .number({ message: "قیمت واحد کتاب را به تومان وارد کنید." })
    .min(0, "قیمت واحد کتاب را به تومان وارد کنید."),
  discount: z
    .number({ message: "مقدار تخفیف کتاب را به تومان وارد کنید." })
    .min(0, "مقدار تخفیف کتاب را به تومان وارد کنید."),
  thumbnail: fileListSchema,
  images: fileListSchema,
  description: z.string().min(1, "جزئیات محصول را وارد کنید."),
});

export type AddProduct = z.infer<typeof schema>;
