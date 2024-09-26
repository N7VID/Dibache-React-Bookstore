import {
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import { PATHS } from "../../configs/paths.config";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";
import ShareIcon from "../../assets/svg/ShareIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import ShieldCheckIcon from "../../assets/svg/ShieldCheckIcon";
import TruckIcon from "../../assets/svg/TruckIconIcon";
import { toPersianNumber } from "../../utils/toPersianNumber";
import ShoppingCart from "../../assets/svg/ShoppingCartIcon";
import ChatBubbleLeftRightIcon from "../../assets/svg/ChatBubbleLeftRightIcon";

export default function BookPage() {
  const { id } = useParams();
  const { data } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
    options: {
      enabled: !!id,
    },
  });

  let endPrice = 0;
  let price = 0;
  let discountPercent = 0;
  if (data?.data.product) {
    const discount = data?.data.product.discount;
    price = data?.data?.product?.price;
    if (discount !== 0) {
      endPrice = price - discount;
      discountPercent = Math.ceil((discount * 100) / price);
    }
  }
  const name = data?.data.product.name.split("اثر");
  const category = `${data?.data.product.category.name}، ${data?.data.product.subcategory.name}`;
  const images = data?.data.product.images;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const ProductDescription = ({ description }: { description: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  return (
    <div className="LayoutContainer cursor-default pb-8">
      <div className="py-4">
        <Breadcrumbs separator={<ChevronLeftIcon className="size-3" />}>
          <BreadcrumbItem>
            <Link to={PATHS.HOME}>دیباچه</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/category/${data?.data.product.category._id}`}>
              {data?.data.product.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/category/${data?.data.product.category._id}`}>
              {data?.data.product.subcategory.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{name?.[0]}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section className="flex items-center justify-between gap-8 pb-8">
        <div className="flex items-center justify-center gap-8">
          <div className="w-[380px]">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {images?.map((image) => (
                <SwiperSlide>
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://${image}`}
                      alt={name?.[0]}
                      className="w-[350px] rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col justify-between gap-28">
            <div>
              <h1 className="text-xl font-bold pb-4">{name?.[0]}</h1>
              <div className="flex flex-col gap-3 text-base">
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">نویسنده:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {name?.[1]}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">انتشارات:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {data?.data.product.brand}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">دسته بندی:</span>
                  <span className="text-value-gray border-b-1 border-value-gray">
                    {category}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-key-gray">امتیاز:</span>
                  <span className="text-value-gray">
                    {data?.data.product.rating.rate} از{" "}
                    {data?.data.product.rating.count} رای
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="border-persian-green text-persian-green"
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
          <Card shadow="sm">
            <CardHeader className="justify-center">
              <h4 className="text-persian-green py-2 text-[18px]">
                خرید کالای فیزیکی
              </h4>
            </CardHeader>
            <Divider className="bg-persian-green p-[0.8px]" />
            <CardBody>
              <div className="flex flex-col justify-between items-center p-4 gap-8">
                <div className="flex justify-between items-center w-full">
                  <span>قیمت:</span>
                  <Badge
                    content={`${toPersianNumber(discountPercent)}%`}
                    className="bg-red-500 text-white size-8 text-[13px]"
                    placement="top-left"
                  >
                    <div className="flex flex-col">
                      <span className="text-key-gray line-through text-[13px] pl-6">
                        {toPersianNumber(price)}
                      </span>
                      <div>
                        <span className="font-semibold text-[18px]">
                          {toPersianNumber(endPrice)}
                        </span>{" "}
                        <span className="text-[12px]">تومان</span>
                      </div>
                    </div>
                  </Badge>
                </div>
                <Button
                  className="bg-persian-green text-white"
                  variant="solid"
                  startContent={<ShoppingCart />}
                >
                  افزودن به سبد خرید
                </Button>
              </div>
            </CardBody>
            <Divider className="bg-persian-green p-[0.8px]" />
            <CardFooter>
              <div className="flex flex-col gap-2 py-2 px-4">
                <div className="flex gap-2">
                  <span>
                    <ShieldCheckIcon />
                  </span>
                  <span className="text-[13px]">
                    گارانتی اصالت و سلامت فیزیکی کالا
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>
                    <TruckIcon />
                  </span>
                  <span className="text-[13px]">امکان تحویل اکسپرس</span>
                </div>
                <div className="flex gap-2">
                  <span>
                    <ChatBubbleLeftRightIcon />
                  </span>
                  <span className="text-[13px]">پشتیبانی شبانه روزی</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="flex flex-col pb-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold">معرفی {name?.[0]}</h3>
        </div>
        <div className="max-w-[980px]">
          {data?.data.product.description && (
            <ProductDescription description={data.data.product.description} />
          )}
        </div>
      </section>
    </div>
  );
}
