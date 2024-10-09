import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuildingStorefrontIcon from "../../assets/svg/BuildingStorefrontIcon";
import { DeleteIcon } from "../../assets/svg/DeleteIcon";
import MinusIcon from "../../assets/svg/MinusIcon";
import PlusIcon from "../../assets/svg/PlusIcon";
import ShieldCheckIcon from "../../assets/svg/ShieldCheckIcon";
import TruckIcon from "../../assets/svg/TruckIconIcon";
import { RootContext } from "../../context/RootContextProvider";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";
import { GetProductsByIdResponse } from "../../types/GetProductsByIdResponse";
import { ProductsEntity } from "../../types/productType";
import { toPersianNumber } from "../../utils/toPersianNumber";

export default function CartCard({
  product,
}: {
  product: { id: string; count: number };
}) {
  const { data, isLoading } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetCartProduct", product],
    queryFn: () => getProductsById(product.id),
  });
  const [count, setCount] = useState(product.count);
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { setCart, cart, setBillData } = context;

  let productsEntity!: ProductsEntity;
  if (data?.data.product) {
    productsEntity = data.data.product;
  }

  const updateProductCountInCart = (productId: string, newCount: number) => {
    const updatedCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, product: { ...item.product, count: newCount } }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  function handleAddCount() {
    if (productsEntity && count < productsEntity?.quantity) {
      const newCount = count + 1;
      setCount(newCount);
      updateProductCountInCart(productsEntity._id!, newCount);
    }
  }
  function handleMinusCount(productId: string) {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateProductCountInCart(productsEntity._id!, newCount);
    } else {
      const updatedCart = cart.filter((item) => item.product.id !== productId);
      setBillData((prev) => prev.filter((item) => item.id !== productId));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  useEffect(() => {
    if (productsEntity) {
      const bill = {
        id: productsEntity?._id,
        image: productsEntity?.images?.[0],
        endPrice: productsEntity?.price * count,
        discount: productsEntity?.discount * count,
        totalPrice: productsEntity?.price + productsEntity?.discount * count,
      };
      setBillData((prev) => {
        const existingItem = prev.find(
          (item) => item.id === productsEntity._id
        );
        if (!existingItem) {
          return [...prev, bill];
        } else {
          return prev.map((item) => {
            if (item.id === bill.id) {
              return bill;
            } else {
              return item;
            }
          });
        }
      });
    }
  }, [count, productsEntity, setBillData]);

  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-box min-h-52 justify-center">
      {isLoading ? (
        <Spinner color="current" size="lg" />
      ) : (
        <>
          {" "}
          <div className="flex items-center gap-4">
            <div>
              <Link to={`/book/${product?.id}`}>
                <img
                  src={`http://${productsEntity?.images?.[0]}`}
                  alt={productsEntity?.name}
                  className="w-32"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-sm">
                <Link to={`/book/${product?.id}`}>{productsEntity?.name}</Link>
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center text-value-gray text-[12px]">
                  <span>
                    <BuildingStorefrontIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>{productsEntity?.brand}</span>
                </div>
                <div className="flex gap-2 items-center text-value-gray text-[12px]">
                  <span>
                    <ShieldCheckIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                </div>
                <div className="flex gap-2 items-center text-value-gray text-[12px]">
                  <span>
                    <TruckIcon className="size-4 mobile:size-5" />
                  </span>
                  <span>امکان تحویل اکسپرس</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 flex gap-8">
            <ButtonGroup variant="bordered">
              <Button isIconOnly onClick={handleAddCount}>
                <PlusIcon className="text-persian-green size-5 font-extrabold decoration-4" />
              </Button>
              <Button isIconOnly disabled>
                <span className="text-lg text-persian-green">{count}</span>
              </Button>
              <Button
                isIconOnly
                onClick={() => handleMinusCount(productsEntity._id)}
              >
                {count === 1 ? (
                  <DeleteIcon className="size-5 text-persian-green" />
                ) : (
                  <MinusIcon className="text-persian-green size-5 font-extrabold decoration-4" />
                )}
              </Button>
            </ButtonGroup>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-persian-green font-semibold text-[11px]">
                {toPersianNumber(+productsEntity?.discount * count)} تومان تخفیف
              </p>
              <p>{toPersianNumber(+productsEntity?.price * count)} تومان</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
