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
import { useMemo, useState } from "react";
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

export default function BooksPage() {
  const [modalType, setModalType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    name: "",
  });
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();

  const limit = searchParams.get("limit") || "5";
  const sort = searchParams.get("sort") || "createdAt";

  const params: {
    page: number;
    limit: string;
    sort: string | null;
  } = {
    page: Number(searchParams.get("page")) || 1,
    limit,
    sort,
  };

  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts", params],
    queryFn: () => getProducts(params),
  });

  const { mutate } = useDeleteServices({
    mutationKey: ["DeleteProducts"],
    mutationFn: deleteProducts,
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

  function handleNameOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort = currentParams.sort === "name" ? "-name" : "name";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  function handleCategoryOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort =
      currentParams.sort === "category" ? "-category" : "category";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  function handlePageChange(page: number) {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }
  const handleActionModal = () => {
    if (selectedItem) {
      mutate(selectedItem.id);
    }
  };
  function handleDeleteButton(id: string, name: string) {
    onOpenDeleteModal();
    setSelectedItem({ id, name });
  }

  return (
    <div className="LayoutContainer pt-[100px]">
      <DropDown onOpen={onOpen} setModalType={setModalType} />
      <Table
        aria-label="Example static collection table"
        className="py-6 cursor-default"
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
              <TableCell>
                {" "}
                <Link to={`/book/${item._id}`}>{item.name}</Link>
              </TableCell>
              <TableCell>{`${item.category.name} / ${item.subcategory.name}`}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="جزئیات"
                    className="font-yekan cursor-default"
                  >
                    <Link to={`/book/${item._id}`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="ویرایش"
                    className="font-yekan cursor-default"
                  >
                    <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                      <EditIcon />
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
                      <DeleteIcon />
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
        modalTitle={`حذف ${selectedItem.name.split("اثر")[0]}؟`}
        modalBody="این عملیات حذف دائمی داده‌ها را به همراه دارد و قابل برگشت نیست. همچنین تمامی اطلاعات مرتبط با این آیتم نیز از دست خواهند رفت."
        buttonContent={["انصراف", "حذف کتاب"]}
      />
    </div>
  );
}
