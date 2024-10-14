import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import InfoIcon from "../../assets/svg/InfoIcon";
import ShareIcon from "../../assets/svg/ShareIcon";
import { PATHS } from "../../configs/paths.config";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { Icart } from "../../types/cartDatatype";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";
import { ProductsEntity } from "../../types/productType";
import { toPersianNumber } from "../../utils/toPersianNumber";
import BookPaymentCard from "./components/BookPaymentCard";

export default function BookPage() {
  const { id } = useParams();
  const [count, setCount] = useState(1);

  const { data } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
    options: {
      enabled: !!id,
    },
  });

  let endPrice = 0;
  let totalPrice = 0;
  let discountPercent = 0;
  let product!: ProductsEntity;
  if (data?.data.product) {
    product = data.data.product;
    const discount = data?.data.product.discount;
    endPrice = data?.data?.product?.price;
    if (discount !== 0) {
      totalPrice = endPrice + discount;
      discountPercent = Math.ceil((discount * 100) / endPrice);
    }
  }

  const name = product?.name.split("اثر");
  const category = `${product?.category.name}، ${product?.subcategory.name}`;
  const images = product?.images;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("با موفقیت کپی شد.");
      })
      .catch((error) => {
        toast.error(`Failed to copy: ${error}`, { rtl: false });
      });
  };

  const ProductDescription = ({ description }: { description: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  useEffect(() => {
    const savedCart: Icart = JSON.parse(localStorage.getItem("cart") || "{}");
    const savedProduct = savedCart?.products?.find(
      (item) => item.product === id
    );

    if (savedProduct) {
      setCount(savedProduct?.count);
    }
  }, [id]);

  useEffect(() => {
    if (!Cookies.get("accessToken")) localStorage.clear();
  }, []);

  return (
    <div className="LayoutContainer cursor-default pb-8">
      <ScrollRestoration />
      <div className="py-4">
        <Breadcrumbs separator={<ChevronLeftIcon className="size-3" />}>
          <BreadcrumbItem>
            <Link
              to={PATHS.HOME}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              دیباچه
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/category/${product?.category._id}`}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              {product?.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/subcategory/${product?.subcategory._id}`}
              className="text-[11px] tablet:text-[14px] lg:text-base"
            >
              {product?.subcategory.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="text-[11px] tablet:text-[14px] lg:text-base">
              {name?.[0]}
            </span>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section className="flex flex-col laptop:flex-row items-center justify-between gap-16 laptop:gap-8 mt-4 pb-16 laptop:pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="sm:w-[380px] w-[220px]">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              navigation
            >
              {images?.map((image) => (
                <SwiperSlide key={image}>
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://${image}`}
                      alt={name?.[0]}
                      className="sm:w-[400px] w-[200px] rounded-lg max-h-[400px] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col gap-8 laptop:gap-6">
            <div>
              <h1 className="text-sm sm:text-[18px] lg:text-xl font-bold pb-2 border-b-2">
                {name?.[0]}
              </h1>
              <div className="flex gap-2 py-1 items-center">
                <img
                  src="/src/assets/images/star.png"
                  alt="star"
                  className="w-3"
                />
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <span>{toPersianNumber(+product?.rating.rate)}</span>
                  <span className="text-key-gray">
                    (امتیاز {toPersianNumber(+product?.rating.count)} خریدار)
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[12px] mobile:text-sm py-5 border-b-2">
                <h4 className="font-semibold text-base pb-2">ویژگی ها</h4>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">نویسنده:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {name?.[1]}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">انتشارات:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {product?.brand}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">دسته بندی:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full justify-between">
              <InfoIcon className="size-5 text-key-gray" />
              <p className="text-[12px] text-key-gray max-w-[500px] leading-5">
                درخواست مرجوع کردن کالا در گروه کتاب {product?.category?.name}{" "}
                با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در
                شرایط اولیه باشد (در صورت پلمپ بودن، کالا نباید باز شده باشد).
              </p>
            </div>
            <div className="flex items-center mobile:gap-4 gap-1">
              <Button
                className="border-persian-green text-persian-green w-44 text-[12px] mobile:text-sm mobile:w-auto"
                variant="bordered"
                startContent={<HeartIcon />}
              >
                اضافه به علاقه مندی ها
              </Button>
              <Button
                onClick={copyToClipboard}
                isIconOnly
                className="border-persian-green text-persian-green"
                variant="bordered"
              >
                <ShareIcon />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <BookPaymentCard
            count={count}
            discountPercent={discountPercent}
            endPrice={endPrice}
            product={product}
            setCount={setCount}
            totalPrice={totalPrice}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 my-4 laptop:px-0 mobile:mp-6 px-4">
        <div>
          <h3 className="text-sm mobile:text-lg font-semibold text-[#222]">
            معرفی {name?.[0]}
          </h3>
        </div>
        <div className="max-w-[650px] text-[11px] mobile:text-sm text-value-gray">
          {data?.data.product.description && (
            <ProductDescription description={data.data.product.description} />
          )}
        </div>
      </section>
    </div>
  );
}
