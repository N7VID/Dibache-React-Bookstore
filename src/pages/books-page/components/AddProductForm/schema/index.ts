import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "نام کتاب را وارد کنید."),
  category: z.string().min(1, "دسته بندی کتاب را انتخاب کنید."),
  subcategory: z.string().min(1, "زیر مجموعه کتاب را انتخاب کنید."),
  brand: z.string().min(1, "نام انتشارات کتاب را وارد کنید."),
  quantity: z.number().min(1, "تعداد موجودی کتاب را وارد کنید"),
  price: z.number().min(1, "قیمت واحد کتاب را به تومان وارد کنید."),
  discount: z.string().min(1, "مقدار تخفیف واحد کتاب را به تومان وارد کنید."),
  thumbnail: z.string().min(1, "تصویر پیش نمایش کتاب را انتخاب کنید."),
  images: z.string().min(1, "تصاویر کتاب را انتخاب کنید."),
  description: z.string().min(1, "جزئیات محصول را وارد کنید."),
});

export type AddProduct = z.infer<typeof schema>;
