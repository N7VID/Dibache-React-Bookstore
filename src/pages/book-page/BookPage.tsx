import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
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

export default function BookPage() {
  const { id } = useParams();
  const { data } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
    options: {
      enabled: !!id,
    },
  });
  const name = data?.data.product.name.split("اثر");
  const category = `${data?.data.product.category.name}، ${data?.data.product.subcategory.name}`;
  const images = data?.data.product.images;

  return (
    <div className="LayoutContainer cursor-default">
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
      <section className="flex items-center gap-8 pb-4">
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
                <span className="text-key-gray" text-sm>
                  دسته بندی:
                </span>
                <span className="text-value-gray border-b-1 border-value-gray">
                  {category}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-key-gray" text-sm>
                  امتیاز:
                </span>
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
              isIconOnly
              className="border-persian-green text-persian-green"
              variant="bordered"
            >
              <ShareIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
