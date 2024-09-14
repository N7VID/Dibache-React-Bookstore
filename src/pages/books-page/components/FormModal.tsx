import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactNode } from "react";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";
import AddProductForm from "./AddProductForm/AddProductForm";
import AddSubcategoryForm from "./AddSubcategoryForm/AddSubcategoryForm";

interface props {
  isOpen: boolean;
  onOpenChange: () => void;
  type: string;
}
export default function FormModal({ isOpen, onOpenChange, type }: props) {
  let modalTitle: string;
  let modalBody: ReactNode;

  switch (type) {
    case "product":
      modalTitle = "اضافه کردن محصول";
      modalBody = <AddProductForm />;
      break;
    case "category":
      modalTitle = "اضافه کردن مجموعه";
      modalBody = <AddCategoryForm />;
      break;
    case "sub-category":
      modalTitle = "اضافه کردن زیرمجموعه";
      modalBody = <AddSubcategoryForm />;
      break;
    default:
      break;
  }
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{modalBody}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="primary" onPress={onClose}>
                  ذخیره
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
