import { Button, Tooltip } from "@nextui-org/react";
import InfoIcon from "../../../assets/svg/InfoIcon";

interface EditBodyType {
  id: string;
  body: { quantity?: number | string; price?: number | string };
}

export default function TableToolbar({
  changeList,
  handleSave,
}: {
  changeList: EditBodyType[];
  handleSave: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Button
        disabled={changeList.length === 0}
        onClick={handleSave}
        variant={changeList.length === 0 ? "bordered" : "solid"}
        className={
          changeList.length === 0
            ? "text-black bg-default-100"
            : "text-white bg-persian-green/80"
        }
      >
        ذخیره تغییرات
      </Button>
      <Tooltip
        placement="top"
        className="font-yekan cursor-default w-56 text-center py-2 text-[12px] text-balance"
        content="با کلیک روی مقادیر قیمت و موجودی می توانید آن ها را ویرایش کنید."
      >
        <div className="pl-4 flex items-center justify-center text-key-gray gap-2">
          <span className="text-[12px]">راهنمایی</span>
          <InfoIcon />
        </div>
      </Tooltip>
    </div>
  );
}
