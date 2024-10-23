import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatBubbleLeftRightIcon from "../../../assets/svg/ChatBubbleLeftRightIcon";
import { DeleteIcon } from "../../../assets/svg/DeleteIcon";
import MinusIcon from "../../../assets/svg/MinusIcon";
import PlusIcon from "../../../assets/svg/PlusIcon";
import ShieldCheckIcon from "../../../assets/svg/ShieldCheckIcon";
import ShoppingCart from "../../../assets/svg/ShoppingCartIcon";
import TruckIcon from "../../../assets/svg/TruckIconIcon";
import { PATHS } from "../../../configs/paths.config";
import { RootContext } from "../../../context/RootContextProvider";
import { Icart } from "../../../types/cartDatatype";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import { ProductsEntity } from "../../../types/productType";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  discountPercent: number;
  endPrice: number;
  product: ProductsEntity;
}

export default function BookPaymentCard({
  count,
  setCount,
  totalPrice,
  discountPercent,
  endPrice,
  product,
}: Props) {
  const navigate = useNavigate();
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { cart, setCart } = context;

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
                {totalPrice ? (
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
                ) : (
                  <div className="flex">
                    <div>
                      <span className="font-semibold text-base mobile:text-[18px]">
                        {toPersianNumber(endPrice)}
                      </span>{" "}
                      <span className="text-[12px]">تومان</span>
                    </div>
                  </div>
                )}
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
                  <span className="text-lg text-persian-green">{count}</span>
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
  );
}
