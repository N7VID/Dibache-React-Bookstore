import { Button, Spinner } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NextUiCard from "../../components/NextUiCard/NextUiCard";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import { Link } from "react-router-dom";

const firstSlider = [
  { src: "/src/assets/images/Ad-5.png" },
  { src: "/src/assets/images/Ad-6.png" },
  { src: "/src/assets/images/Ad-4.png" },
  { src: "/src/assets/images/Ad-3.png" },
  { src: "/src/assets/images/Ad-2.png" },
  { src: "/src/assets/images/Ad-1.png" },
];
const secondSlider = [
  {
    src: "/src/assets/images/Cat-1.png",
    path: "/category/66e6bf415611008189a0bd30",
  },
  {
    src: "/src/assets/images/Cat-2.png",
    path: "/category/66e6a3a95611008189a0bd14",
  },
  { src: "/src/assets/images/Cat-3.png", path: "" },
  { src: "/src/assets/images/Cat-4.png", path: "" },
];

export default function HomePage() {
  const { data: firstCategoryData, isLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetFirstCategoryBooks"],
      queryFn: () =>
        getProducts({ limit: "6", category: "66e6bf415611008189a0bd30" }),
    });
  const { data: secondCategoryData, isLoading: secondCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetSecondCategoryBooks"],
      queryFn: () =>
        getProducts({ limit: "6", category: "66e6a3a95611008189a0bd14" }),
    });

  let firstCategoryItems: ProductsEntity[] = [];
  let secondCategoryItems: ProductsEntity[] = [];
  if (firstCategoryData?.data.products)
    firstCategoryItems = firstCategoryData.data.products;

  if (secondCategoryData?.data.products)
    secondCategoryItems = secondCategoryData?.data?.products;

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
        <section className="py-8 px-[50px]">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {firstSlider.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <img
                    src={slide.src}
                    alt=""
                    className="rounded-xl w-[350px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="py-8">
          <div className="flex justify-between items-center px-6">
            <h3 className="font-semibold text-lg">
              داستان و رمان هایی که باید بخوانید
            </h3>
            <Link to={`/category/66e6bf415611008189a0bd30`}>
              <span className="text-persian-green font-semibold flex justify-between items-center gap-2">
                مشاهده همه
                <ChevronLeftIcon className="size-4" />
              </span>
            </Link>
          </div>
          <div className="flex justify-center flex-wrap items-center gap-4 py-8">
            {isLoading ? (
              <Spinner size="lg" color="current" />
            ) : (
              <>
                {firstCategoryItems.map((item) => (
                  <NextUiCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </section>
        <section className="py-8">
          <div className="flex justify-between items-center px-6">
            <h3 className="font-semibold text-lg">
              سفری به درون ذهن با کتاب‌های روانشناسی
            </h3>
            <Link to={`/category/66e6a3a95611008189a0bd14`}>
              <span className="text-persian-green font-semibold flex justify-between items-center gap-2">
                مشاهده همه
                <ChevronLeftIcon className="size-4" />
              </span>
            </Link>
          </div>
          <div className="flex justify-center flex-wrap items-center gap-4 py-8">
            {secondCategoryIsLoading ? (
              <Spinner size="lg" color="current" />
            ) : (
              <>
                {secondCategoryItems?.map((item) => (
                  <NextUiCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </section>
        <h2 className="text-xl font-bold text-center pt-8">
          دسته بندی متنوع کتاب ها در دیباچه
        </h2>
        <section className="py-8 pb-[100px] px-[50px]">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {secondSlider.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <Link to={slide.path}>
                    <img
                      src={slide.src}
                      alt="Cat-1"
                      className="rounded-xl w-[350px]"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
