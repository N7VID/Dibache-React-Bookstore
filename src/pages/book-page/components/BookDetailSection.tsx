import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import HeartIcon from "../../../assets/svg/HeartIcon";
import InfoIcon from "../../../assets/svg/InfoIcon";
import ShareIcon from "../../../assets/svg/ShareIcon";
import { ProductsEntity } from "../../../types/productType";
import { toPersianNumber } from "../../../utils/toPersianNumber";

export default function BookDetailSection({
  product,
}: {
  product: ProductsEntity;
}) {
  const name = product?.name.split("اثر");
  const category = `${product?.category.name}، ${product?.subcategory.name}`;

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

  const features = [
    { key: "نویسنده:", value: name?.[1] },
    { key: "انتشارات:", value: product?.brand },
    { key: "دسته بندی:", value: category },
  ];

  return (
    <section className="flex flex-col gap-8 laptop:gap-6">
      <div>
        <h1 className="text-sm sm:text-[18px] lg:text-xl font-bold pb-2 border-b-2">
          {name?.[0]}
        </h1>
        <div className="flex gap-2 py-1 items-center">
          <img src="/src/assets/images/star.png" alt="star" className="w-3" />
          <div className="flex items-center gap-2 text-[12px] font-semibold">
            <span>{toPersianNumber(+product?.rating.rate)}</span>
            <span className="text-key-gray">
              (امتیاز {toPersianNumber(+product?.rating.count)} خریدار)
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-[12px] mobile:text-sm py-5 border-b-2">
          <h4 className="font-semibold text-base pb-2">ویژگی ها</h4>
          {features.map((feature) => (
            <div className="flex gap-2 items-center" key={feature.key}>
              <span className="text-key-gray">{feature.key}</span>
              <span className="text-value-gray border-b-1 border-value-gray">
                {feature.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full justify-between">
        <InfoIcon className="size-5 text-key-gray" />
        <p className="text-[12px] text-key-gray max-w-[500px] leading-5">
          درخواست مرجوع کردن کالا در گروه کتاب {product?.category?.name} با دلیل
          "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه
          باشد (در صورت پلمپ بودن، کالا نباید باز شده باشد).
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
    </section>
  );
}
