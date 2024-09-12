import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactNode } from "react";
import AddProductForm from "./AddProductForm";

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
      modalBody = <AddProductForm />;
      break;
    case "sub-category":
      modalTitle = "اضافه کردن زیرمجموعه";
      modalBody = <AddProductForm />;
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
        className="font-yekan"
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
