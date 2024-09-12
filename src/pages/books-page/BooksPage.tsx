import { useState } from "react";
import DropDown from "./components/DropDown";
import { useDisclosure } from "@nextui-org/react";
import FormModal from "./components/FormModal";

export default function BooksPage() {
  const [modalType, setModalType] = useState("");
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();
  return (
    <div className="LayoutContainer py-4">
      <DropDown onOpen={onOpenAdd} setModalType={setModalType} />
      <FormModal
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        type={modalType}
      />
    </div>
  );
}
