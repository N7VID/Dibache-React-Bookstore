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
import { useSearchParams } from "react-router-dom";
import { DeleteIcon } from "../../assets/svg/DeleteIcon";
import { EditIcon } from "../../assets/svg/EditIcon";
import { EyeIcon } from "../../assets/svg/EyeIcon";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { renderItem } from "../../utils/paginationRenderItem";
import DropDown from "./components/DropDown";
import FormModal from "./components/FormModal";

export default function BooksPage() {
  const [modalType, setModalType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || "5";

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const params: { page: number; limit: number } = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 5,
  };

  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts", params],
    queryFn: () => getProducts(params),
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

  return (
    <div className="LayoutContainer pt-[100px]">
      <DropDown onOpen={onOpenAdd} setModalType={setModalType} />
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
                radius="full"
                color="primary"
                page={Number(searchParams.get("page")) || 1}
                total={pages}
                onChange={(page) =>
                  setSearchParams({ page: page.toString(), limit })
                }
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="thumbnail">تصویر</TableColumn>
          <TableColumn key="name" allowsSorting>
            نام کتاب
          </TableColumn>
          <TableColumn
            key="category"
            onClick={() => alert("cliced")}
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
                  src={`http://${item?.images?.[0]}`}
                  alt={item.name}
                  className="w-10"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{`${item.category.name} / ${item.subcategory.name}`}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="جزئیات"
                    className="font-yekan cursor-default"
                  >
                    <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
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
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        type={modalType}
      />
    </div>
  );
}
