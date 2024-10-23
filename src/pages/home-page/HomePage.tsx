import { Button } from "@nextui-org/react";
import { Link, ScrollRestoration } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetServices } from "../../hooks/useGetServices";
import { getCategories } from "../../queryhooks/getCategories";
import { getProducts } from "../../queryhooks/product";
import { CategoriesResponse } from "../../types/categoriesResponse";
import { getProductsResponse } from "../../types/productType";
import HomePageAccordion from "./components/HomePageAccordion";
import HomePageCategorySection from "./components/HomePageCategorySection";

const firstSlider = [
  { src: "/src/assets/images/Ad-5.png" },
  { src: "/src/assets/images/Ad-6.png" },
  { src: "/src/assets/images/Ad-4.png" },
  { src: "/src/assets/images/Ad-3.png" },
  { src: "/src/assets/images/Ad-2.png" },
  { src: "/src/assets/images/Ad-1.png" },
];

export default function HomePage() {
  const { data } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategoriesHomepage"],
    queryFn: getCategories,
  });
  const categories = data?.data.categories;
  const secondSlider = [
    {
      src: "/src/assets/images/Cat-1.png",
      path: `/category/${categories?.[1]._id}`,
    },
    {
      src: "/src/assets/images/Cat-2.png",
      path: `/category/${categories?.[0]._id}`,
    },
    {
      src: "/src/assets/images/Cat-3.png",
      path: `/category/${categories?.[2]._id}`,
    },
    {
      src: "/src/assets/images/Cat-4.png",
      path: `/category/${categories?.[3]._id}`,
    },
  ];

  const { data: firstCategoryData, isLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetFirstCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[1]._id }),
    });
  const { data: secondCategoryData, isLoading: secondCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetSecondCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[0]._id }),
    });
  const { data: thirdCategoryData, isLoading: thirdCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetThirdCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[2]._id }),
    });
  const { data: fourthCategoryData, isLoading: fourthCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetFourthCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[3]._id }),
    });

  const firstCategoryItems = firstCategoryData?.data?.products || [];
  const secondCategoryItems = secondCategoryData?.data?.products || [];
  const thirdCategoryItems = thirdCategoryData?.data?.products || [];
  const fourthCategoryItems = fourthCategoryData?.data?.products || [];

  return (
    <>
      <section className="h-[120px] mobile:h-[150px] md:h-[300px] w-full bg-persian-green flex justify-center items-center cursor-default px-4 -mt-12 mobile:-mt-0">
        <ScrollRestoration />
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
        <h2 className="text-sm tablet:text-lg font-bold text-center pt-8">
          خرید آسان کتاب در دسته‌بندی‌های مختلف از دیباچه
        </h2>
        <section className="py-8 px-[10px] tablet:px-[50px]">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={10}
            breakpoints={{
              900: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
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

        <HomePageCategorySection
          title="داستان و رمان هایی که باید بخوانید"
          path={categories?.[1]._id}
          isLoading={isLoading}
          categoryItems={firstCategoryItems}
        />
        <HomePageCategorySection
          title="سفری به درون ذهن با کتاب‌های روانشناسی"
          path={categories?.[0]._id}
          isLoading={secondCategoryIsLoading}
          categoryItems={secondCategoryItems}
        />
        <h2 className="font-bold text-center text-sm tablet:text-lg">
          دسته بندی متنوع کتاب ها در دیباچه
        </h2>
        <section className="py-8 px-[10px] tablet:px-[50px]">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={10}
            breakpoints={{
              900: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
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
        <HomePageCategorySection
          title="کشف داستان‌های شگفت‌انگیز با کتاب‌های ادبیات"
          path={categories?.[2]._id}
          isLoading={thirdCategoryIsLoading}
          categoryItems={thirdCategoryItems}
        />
        <HomePageCategorySection
          title="کاوش در جهان خلاقیت و الهام با کتاب‌های هنر"
          path={categories?.[3]._id}
          isLoading={fourthCategoryIsLoading}
          categoryItems={fourthCategoryItems}
        />
        <section className="py-8">
          <div className="bg-persian-green py-2 px-[10px] tablet:px-[50px] rounded-lg flex justify-between items-center">
            <h4 className="text-lg text-white">
              به عزیزان <br /> و دوستانتان کتاب <br /> هدیه دهید!
            </h4>
            <img
              src="/src/assets/images/i152311623630.png"
              alt=""
              className="w-32"
            />
            <Button
              className="w-32 bg-white text-medium hidden md:block"
              size="sm"
              radius="full"
            >
              اطلاعات بیشتر
            </Button>
          </div>
        </section>
        <HomePageAccordion />
      </div>
    </>
  );
}
