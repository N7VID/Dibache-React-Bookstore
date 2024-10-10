import {
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import {
  Link,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChatBubbleLeftRightIcon from "../../assets/svg/ChatBubbleLeftRightIcon";
import ChevronLeftIcon from "../../assets/svg/ChevronLeftIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import MinusIcon from "../../assets/svg/MinusIcon";
import PlusIcon from "../../assets/svg/PlusIcon";
import ShareIcon from "../../assets/svg/ShareIcon";
import ShieldCheckIcon from "../../assets/svg/ShieldCheckIcon";
import ShoppingCart from "../../assets/svg/ShoppingCartIcon";
import TruckIcon from "../../assets/svg/TruckIconIcon";
import { PATHS } from "../../configs/paths.config";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";
import { ProductsEntity } from "../../types/productType";
import { toPersianNumber } from "../../utils/toPersianNumber";
import { useContext, useEffect, useState } from "react";
import { DeleteIcon } from "../../assets/svg/DeleteIcon";
import { RootContext } from "../../context/RootContextProvider";
import { Icart } from "../../types/cartDatatype";

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, setCart } = context;

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

  const isProductInCart = (productId: string) => {
    return cart?.products?.some((item) => item.product === productId);
  };

  function handleAddCartButton(productId: string) {
    const accessToken = Cookies.get("accessToken");
    const userId = localStorage.getItem("user");

    if (accessToken && userId) {
      const cartValue: Icart = {
        user: JSON.parse(userId)._id,
        products: [{ product: productId, count }],
      };
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        updatedCart.user = cartValue.user;
        const existingProductIndex = updatedCart?.products?.findIndex(
          (item) => item.product === productId
        );
        if (existingProductIndex >= 0) {
          updatedCart.products[existingProductIndex].count += count;
        } else {
          updatedCart.products = [
            ...(updatedCart?.products || []),
            cartValue.products[0],
          ];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      navigate(PATHS.LOGIN);
    }
  }

  const updateProductCountInCart = (productId: string, newCount: number) => {
    const updatedProduct = cart.products.map((item) =>
      item.product === productId ? { ...item, count: newCount } : item
    );
    setCart((prev) => ({
      ...prev,
      products: updatedProduct,
    }));
    localStorage.setItem(
      "cart",
      JSON.stringify({ ...cart, products: updatedProduct })
    );
  };

  function handleAddCount() {
    if (product && count < product.quantity) {
      const newCount = count + 1;
      setCount(newCount);
      updateProductCountInCart(product._id!, newCount);
    }
  }

  function handleMinusCount(productId: string) {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateProductCountInCart(product._id!, newCount);
    } else {
      const updatedCart = cart.products.filter(
        (item) => item.product !== productId
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...cart, products: updatedCart })
      );
      setCart((prev) => ({
        ...prev,
        products: updatedCart,
      }));
    }
  }

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
      <section className="flex flex-col laptop:flex-row items-center justify-between gap-16 laptop:gap-8 pb-16 laptop:pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
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
                      className="sm:w-[350px] w-[200px] rounded-lg max-h-[400px] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col justify-between gap-8 laptop:gap-28">
            <div>
              <h1 className="text-sm sm:text-[18px] lg:text-xl font-bold pb-4">
                {name?.[0]}
              </h1>
              <div className="flex flex-col gap-3 text-[12px] mobile:text-base">
                <div className="flex gap-2 items-center ">
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
                <div className="flex gap-2 items-center">
                  <div className="text-key-gray">
                    <span>امتیاز کتاب:</span>
                  </div>
                  <img
                    src="/src/assets/images/star.png"
                    alt="star"
                    className="w-4"
                  />
                  <span className="text-value-gray text-sm">
                    {product?.rating.rate} از {product?.rating.count} رای
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mobile:gap-4 gap-1">
              <Button
                className="border-persian-green text-persian-green w-44 text-[12px] mobile:text-base mobile:w-auto"
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
              <h4 className="text-persian-green py-2 mobile:text-[18px] text-sm">
                خرید کالای فیزیکی
              </h4>
            </CardHeader>
            <Divider className="bg-persian-green p-[0.8px]" />
            <CardBody>
              <div className="flex flex-col justify-between items-center p-4 gap-8">
                <div className="flex justify-between items-center w-full">
                  {product?.quantity > 0 ? (
                    <>
                      <span className="text-sm mobile:text-base">قیمت:</span>
                      <Badge
                        content={`${toPersianNumber(discountPercent)}%`}
                        className="bg-red-500 text-white mobile:size-8 size-6 text-[10px] mobile:text-[13px]"
                        placement="top-left"
                      >
                        <div className="flex flex-col">
                          <span className="text-key-gray line-through text-[10px] pl-6 mobile:text-[13px]">
                            {toPersianNumber(totalPrice)}
                          </span>
                          <div>
                            <span className="font-semibold text-base mobile:text-[18px]">
                              {toPersianNumber(endPrice)}
                            </span>{" "}
                            <span className="text-[12px]">تومان</span>
                          </div>
                        </div>
                      </Badge>
                    </>
                  ) : (
                    <div className="w-full text-center">
                      این کتاب در حال حاضر موجود نیست ):
                    </div>
                  )}
                </div>
                {isProductInCart(product?._id) ? (
                  <div className="flex items-center justify-center gap-4">
                    <ButtonGroup variant="bordered">
                      <Button isIconOnly onClick={handleAddCount}>
                        <PlusIcon className="text-persian-green size-5 font-extrabold decoration-4" />
                      </Button>
                      <Button isIconOnly disabled>
                        <span className="text-lg text-persian-green">
                          {count}
                        </span>
                      </Button>
                      <Button
                        isIconOnly
                        onClick={() => handleMinusCount(product._id)}
                      >
                        {count === 1 ? (
                          <DeleteIcon className="size-5 text-persian-green" />
                        ) : (
                          <MinusIcon className="text-persian-green size-5 font-extrabold decoration-4" />
                        )}
                      </Button>
                    </ButtonGroup>
                    <div className="flex flex-col justify-center gap-1 items-start font-medium">
                      <span className="text-[14px]">در سبد شما</span>
                      <span className="text-[11px]">
                        مشاهده{" "}
                        <Link
                          to={PATHS.CART}
                          className="text-persian-green font-semibold"
                        >
                          سبد خرید
                        </Link>
                      </span>
                    </div>
                  </div>
                ) : (
                  <Button
                    className="bg-persian-green text-white w-44 text-[13px] mobile:text-base mobile:w-auto"
                    variant="solid"
                    startContent={<ShoppingCart />}
                    isDisabled={product?.quantity === 0}
                    onClick={() => handleAddCartButton(product._id)}
                  >
                    {product?.quantity > 0 ? "افزودن به سبد خرید" : "ناموجود"}
                  </Button>
                )}
              </div>
            </CardBody>
            <Divider className="bg-persian-green p-[0.8px]" />
            <CardFooter>
              <div className="flex flex-col gap-2 py-2 px-4 text-[9px] mobile:text-[13px]">
                <div className="flex gap-2 items-center">
                  <span>
                    <ShieldCheckIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <TruckIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>امکان تحویل اکسپرس</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <ChatBubbleLeftRightIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>پشتیبانی شبانه روزی</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="flex flex-col pb-4 gap-4 laptop:px-0 mobile:mp-6 px-4">
        <div>
          <h3 className="text-sm mobile:text-lg font-semibold">
            معرفی {name?.[0]}
          </h3>
        </div>
        <div className="max-w-[980px] text-[11px] mobile:text-base">
          {data?.data.product.description && (
            <ProductDescription description={data.data.product.description} />
          )}
        </div>
      </section>
    </div>
  );
}
