import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import { IBill } from "../../../types/billDataType";

export default function PaymentCard({ item }: { item: IBill }) {
  return (
    <Card className="py-2 w-36" isHoverable key={item.id}>
      <div className="text-center pb-2">
        <span className="text-[12px] font-semibold text-persian-green">
          موجود در سبد خرید
        </span>
      </div>
      <Divider className="bg-persian-green p-[0.8px]" />
      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <Link to={`/book/${item.id}`}>
          <Badge
            placement="bottom-left"
            className="bg-persian-green text-white"
            content={toPersianNumber(+item.count)}
          >
            <img
              src={`http://${item.image}`}
              alt={item.id}
              className="w-24 h-24"
            />
          </Badge>
        </Link>
      </CardBody>
      <CardFooter className="pb-1 pt-2 px-2 flex-col flex items-start gap-1">
        <Tooltip
          content={item.name}
          className="font-yekan text-[10px] bg-persian-green text-white cursor-default"
        >
          <Link color="foreground" to={`/book/${item.id}`}>
            <h4 className="text-[10px] font-bold text-ellipsis whitespace-nowrap overflow-hidden w-32">
              {item.name}
            </h4>
          </Link>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
