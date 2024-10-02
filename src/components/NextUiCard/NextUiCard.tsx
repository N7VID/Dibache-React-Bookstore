import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ProductsEntity } from "../../types/productType";
import { toPersianNumber } from "../../utils/toPersianNumber";

interface Props {
  item: ProductsEntity;
}

export default function NextUiCard({ item }: Props) {
  let thumbnail = "";
  let endPrice = 0;
  let discountPercent = 0;
  if (item.images) {
    thumbnail = item.images[0];
  }
  if (item.discount !== 0) {
    endPrice = item.price - item.discount;
    discountPercent = Math.ceil((item.discount * 100) / item.price);
  }

  return (
    <Card className="py-5 w-48" isHoverable>
      <Link to={`/book/${item._id}`}>
        <CardBody className="overflow-visible py-2">
          <Badge
            placement="top-left"
            className="bg-red-600 text-white size-8"
            size="lg"
            isInvisible={!discountPercent}
            content={`${toPersianNumber(discountPercent)}%`}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl h-40"
              src={`http://${thumbnail}`}
              width={270}
            />
          </Badge>
        </CardBody>
      </Link>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start gap-2">
        <Tooltip
          content={item.name}
          className="font-yekan text-[10px] bg-persian-green text-white cursor-default"
        >
          <Link to={`/book/${item._id}`}>
            <h4 className="text-[13px] font-bold text-ellipsis whitespace-nowrap overflow-hidden w-40">
              {item.name}
            </h4>
          </Link>
        </Tooltip>
        <small className="text-default-500">{item.brand}</small>
        {endPrice ? (
          <div className="flex justify-between w-full">
            <p className="font-bold text-[12px] text-gray-400 line-through">
              {toPersianNumber(item.price)}
            </p>
            <p className="font-bold text-[12px]">
              {toPersianNumber(endPrice)} تومان
            </p>
          </div>
        ) : (
          <p className="font-bold text-[12px]">
            {toPersianNumber(item.price)} تومان
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
