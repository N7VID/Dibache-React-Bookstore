import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import AddProductForm from "./AddProductForm/AddProductForm";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";
import AddSubcategoryForm from "./AddSubcategoryForm/AddSubcategoryForm";

interface props {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  type: string;
}
export default function FormModal({
  isOpen,
  onOpenChange,
  onClose,
  type,
}: props) {
  const handleFormModalType = (type: string) => {
    switch (type) {
      case "product":
        return {
          modalTitle: "اضافه کردن محصول",
          modalBody: <AddProductForm onClose={onClose} />,
        };
      case "category":
        return {
          modalTitle: "اضافه کردن مجموعه",
          modalBody: <AddCategoryForm onClose={onClose} />,
        };
      case "sub-category":
        return {
          modalTitle: "اضافه کردن زیرمجموعه",
          modalBody: <AddSubcategoryForm onClose={onClose} />,
        };
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="font-yekan"
        scrollBehavior="inside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {handleFormModalType(type)?.modalTitle}
            </ModalHeader>
            <ModalBody>{handleFormModalType(type)?.modalBody}</ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
