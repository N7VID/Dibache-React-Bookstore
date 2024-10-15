import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import PlusCircle from "../../../assets/svg/PlusCircle";
import { Key } from "react";
import FolderPlus from "../../../assets/svg/FolderPlus";
import DocumentPlus from "../../../assets/svg/DocumentPlus";

interface props {
  onOpen: () => void;
  setModalType: (type: string) => void;
}

export default function DropDown({ onOpen, setModalType }: props) {
  function handleDropDownItem(key: Key) {
    setModalType(`${key}`);
    onOpen();
  }
  return (
    <Dropdown className="font-yekan">
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="bg-white"
          startContent={<PlusCircle className="size-5" />}
          endContent={
            <img
              src="/src/assets/svg/chevron-down-mini-black.svg"
              alt="chevron-down-logo"
              className="w-4"
            />
          }
        >
          اضافه کردن
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key: Key) => handleDropDownItem(key)}
      >
        <DropdownItem
          key="product"
          startContent={<PlusCircle className="size-4" />}
        >
          محصول
        </DropdownItem>

        <DropdownItem
          key="category"
          textValue="cart"
          startContent={<FolderPlus className="size-4" />}
        >
          مجموعه
        </DropdownItem>
        <DropdownItem
          key="sub-category"
          startContent={<DocumentPlus className="size-4" />}
        >
          زیر مجموعه
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
