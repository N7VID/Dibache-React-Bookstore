import { Accordion, AccordionItem } from "@nextui-org/react";

export default function HomePageAccordion() {
  return (
    <section className="lg:px-64 md:pb-16 pb-32 mobile:px-10 px-0">
      <h3 className="font-semibold py-8 text-center text-sm tablet:text-lg">
        سوالات رایج در فروشگاه دیباچه
      </h3>
      <Accordion variant="bordered">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="چگونه می‌توانم سفارشم را پیگیری کنم؟"
        >
          پاسخ: پس از ثبت سفارش، شما یک ایمیل یا پیامک حاوی کد پیگیری دریافت
          خواهید کرد. با وارد کردن این کد در بخش "پیگیری سفارش" در سایت دیباچه،
          می‌توانید وضعیت ارسال سفارش خود را بررسی کنید.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="چگونه از کد تخفیف استفاده کنم؟"
        >
          پاسخ: هنگام نهایی کردن خرید خود، در صفحه پرداخت، بخشی به نام "کد
          تخفیف" وجود دارد. کد تخفیف خود را در آن بخش وارد کنید و سپس بر روی
          دکمه "اعمال" کلیک کنید تا تخفیف بر روی مبلغ کل اعمال شود.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="کتاب‌های فیزیکی چه زمانی به دست من می‌رسند؟"
        >
          پاسخ: زمان تحویل سفارش بسته به موقعیت مکانی شما متفاوت است. به طور
          معمول، کتاب‌ها طی ۳ تا ۵ روز کاری در داخل کشور به دست شما می‌رسند.
          برای مناطق دورتر، ممکن است زمان تحویل بیشتر باشد.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="آیا می‌توانم سفارشم را لغو یا تغییر دهم؟"
        >
          پاسخ: تا زمانی که سفارش شما وارد مرحله پردازش نشده باشد، امکان لغو یا
          تغییر سفارش وجود دارد. برای این کار، وارد حساب کاربری خود شده و از بخش
          "سبد خرید" با لغو یا تغییر سفارش محصولات انتخابی خود را در سبد خرید
          کنترل نمایید. در صورت پردازش شدن سفارش، امکان لغو وجود نخواهد داشت.
        </AccordionItem>
      </Accordion>
    </section>
  );
}
