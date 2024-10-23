import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useContext, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteIcon } from "../../assets/svg/DeleteIcon";
import { EditIcon } from "../../assets/svg/EditIcon";
import { EyeIcon } from "../../assets/svg/EyeIcon";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { renderItem } from "../../utils/paginationRenderItem";
import DropDown from "./components/DropDown";
import FormModal from "./components/FormModal";
import NextUiModal from "../../components/NextUiModal/NextUiModal";
import { useDeleteServices } from "../../hooks/useDeleteServices";
import { deleteProducts } from "../../queryhooks/admin/products";
import { toast } from "react-toastify";
import { useTableSort } from "../../hooks/useTableSort";
import { RootContext } from "../../context/RootContextProvider";

export default function BooksPage() {
  const [modalType, setModalType] = useState("");
  const [searchParams] = useSearchParams();
  const { handlePageChange, handleCategoryOrderColumn, handleNameOrderColumn } =
    useTableSort();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useCart must be used within a RootContextProvider");
  const { selectedItemEditForm, setSelectedItemEditForm } = context;

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();

  const limit = searchParams.get("limit") || "5";
  const sort = searchParams.get("sort") || "-createdAt";

  const params: {
    page: number;
    limit: string;
    sort: string | null;
  } = {
    page: Number(searchParams.get("page")) || 1,
    limit,
    sort,
  };

  const { data, isLoading, refetch } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts", params],
    queryFn: () => getProducts(params),
  });

  const { mutate } = useDeleteServices({
    mutationKey: ["DeleteProducts"],
    mutationFn: deleteProducts,
    invalidate: ["GetProducts"],
    options: {
      onSuccess() {
        toast.success(`کتاب با موفقیت حذف شد.`);
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  const rowsPerPage = data?.per_page ? data?.per_page : 5;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);
  const loadingState =
    isLoading || data?.data.products?.length === 0 ? "loading" : "idle";

  let items: ProductsEntity[] = [];
  if (data?.data.products?.length) {
    items = data.data.products;
  }

  function handleActionModal() {
    if (selectedItemEditForm) {
      mutate(selectedItemEditForm.id, {
        onError: () => {
          refetch();
        },
      });
    }
  }
  function handleDeleteButton(id: string, name: string) {
    onOpenDeleteModal();
    setSelectedItemEditForm({ id, name });
  }
  function handleEditButton(item: ProductsEntity) {
    onOpen();
    setModalType("edit");
    if (item) setSelectedItemEditForm((prev) => ({ ...prev, item }));
  }

  return (
    <div className="LayoutContainer pt-[85px] md:px-16 cursor-default">
      <h2 className="text-2xl text-value-gray font-semibold py-6">
        مدیریت محصولات
      </h2>
      <DropDown onOpen={onOpen} setModalType={setModalType} />
      <Table
        aria-label="Example static collection table"
        className="py-3 cursor-default"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                dir="rtl"
                renderItem={renderItem}
                showControls
                size="sm"
                showShadow
                radius="md"
                color="primary"
                page={Number(searchParams.get("page")) || 1}
                total={pages}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="thumbnail">تصویر</TableColumn>
          <TableColumn key="name" allowsSorting onClick={handleNameOrderColumn}>
            نام کتاب
          </TableColumn>
          <TableColumn
            key="category"
            onClick={handleCategoryOrderColumn}
            allowsSorting
          >
            دسته بندی
          </TableColumn>
          <TableColumn key="action">عملیات</TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {items.map((item: ProductsEntity) => (
            <TableRow key={item._id} className="border-b-1">
              <TableCell>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${item?.thumbnail}`}
                  alt={item.name}
                  className="w-16"
                />
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">
                <Link to={`/book/${item._id}`}>{item.name}</Link>
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">{`${item.category.name} / ${item.subcategory.name}`}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="جزئیات"
                    className="font-yekan cursor-default"
                  >
                    <Link to={`/book/${item._id}`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                        <EyeIcon className="size-3 mobile:size-auto" />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="ویرایش"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-default-900 cursor-pointer active:opacity-50"
                      onClick={() => handleEditButton(item)}
                    >
                      <EditIcon className="size-3 mobile:size-auto" />
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="حذف کتاب"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDeleteButton(item._id, item.name)}
                    >
                      <DeleteIcon className="size-3 mobile:size-auto" />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        type={modalType}
      />
      <NextUiModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeModal}
        onAction={handleActionModal}
        modalTitle={`حذف ${selectedItemEditForm.name.split("اثر")[0]}؟`}
        modalBody="این عملیات حذف دائمی داده‌ها را به همراه دارد و قابل برگشت نیست. همچنین تمامی اطلاعات مرتبط با این آیتم نیز از دست خواهند رفت."
        buttonContent={["انصراف", "حذف کتاب"]}
      />
    </div>
  );
}
