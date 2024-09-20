import { Button } from "@nextui-org/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  return (
    <>
      <section className="h-[120px] mobile:h-[150px] md:h-[300px] w-full bg-persian-green flex justify-center items-center cursor-default px-4">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl mobile:text-2xl md:text-3xl font-bold text-white border-b-2 pb-4 border-white">
            دیباچه، کتاب‌ها آغازگر هر داستان‌اند!
          </h2>
          <div className="text-center text-white text-[12px] md:text-base pt-4 pb-6 hidden md:block">
            <p>از تازه‌های نشر تا کلاسیک‌های ماندگار،</p>
            <p>در دیباچه کتابی برای هر سلیقه‌ای خواهید یافت.</p>
          </div>
          <Button
            className="w-32 bg-white text-medium hidden md:block"
            size="sm"
            radius="full"
          >
            مشاهده
          </Button>
        </div>
        <img
          src="/src/assets/images/hero-1.png"
          alt="hero-image"
          className="md:w-[450px] mobile:w-56 w-36 h-[120px] mobile:h-auto"
        />
      </section>
      <div className="LayoutContainer cursor-default">
        <h2 className="text-xl font-bold text-center pt-8">
          خرید آسان کتاب در دسته‌بندی‌های مختلف از دیباچه
        </h2>
        <section className="py-8">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={3}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-[1100px]"
          >
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/images/Ad-4.png"
                  alt=""
                  className="rounded-xl w-[350px]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/images/Ad-3.png"
                  alt=""
                  className="rounded-xl w-[350px]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/images/Ad-2.png"
                  alt=""
                  className="rounded-xl w-[350px]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/images/Ad-1.png"
                  alt=""
                  className="rounded-xl w-[350px]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      </div>
    </>
  );
}
