import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MainBreadcrumbs from "../../components/MainBreadcrumbs/MainBreadcrumbs";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { Icart } from "../../types/cartDatatype";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";
import { ProductsEntity } from "../../types/productType";
import BookPaymentCard from "./components/BookPaymentCard";
import BookDetailSection from "./components/BookDetailSection";
import BookDescription from "./components/BookDescription";

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
  const images = product?.images;

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
        <MainBreadcrumbs type="single" product={product} />
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
          <BookDetailSection product={product} />
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
      <BookDescription data={product} />
    </div>
  );
}
