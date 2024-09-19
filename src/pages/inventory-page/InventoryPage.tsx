import {
  Button,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { renderItem } from "../../utils/paginationRenderItem";

interface EditModeType {
  id: string;
  price: number;
  quantity: number;
}

export default function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editMode, setEditMode] = useState<EditModeType[]>([]);

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

  function handlePriceOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort = currentParams.sort === "price" ? "-price" : "price";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  function handleInventoryOrderColumn() {
    const currentParams = Object.fromEntries([...searchParams]);
    const newSort =
      currentParams.sort === "quantity" ? "-quantity" : "quantity";
    setSearchParams({ ...currentParams, sort: newSort });
  }

  function handlePageChange(page: number) {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }

  function handleEditData(id: string, price: number, quantity: number) {
    const existing = editMode.find((data) => data.id === id);
    if (!existing) {
      setEditMode((prev) => [...prev, { id, price, quantity }]);
    }
  }

  function handleOnChange(e, id, field: "price" | "quantity") {
    setEditMode((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: Number(e.target.value) } : item
      )
    );
  }

  function handleSave() {
    // Here you would send the updated data to your backend
    console.log("Saving data:", editMode);
    setEditMode([]); // Clear edit mode after saving
  }

  function handleCancel(id) {
    setEditMode((prev) => prev.filter((data) => data.id !== id));
  }

  return (
    <div className="LayoutContainer pt-[100px]">
      <Button
        disabled={editMode.length === 0}
        onClick={handleSave}
        variant={editMode.length === 0 ? "bordered" : "solid"}
        className={editMode.length === 0 ? "text-black" : "text-white"}
        color="success"
      >
        ذخیره تغییرات
      </Button>
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
                onChange={(page) => handlePageChange(page)}
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
            key="price"
            allowsSorting
            onClick={handlePriceOrderColumn}
          >
            قیمت
          </TableColumn>
          <TableColumn
            key="quantity"
            allowsSorting
            onClick={handleInventoryOrderColumn}
          >
            موجودی
          </TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {items.map((item: ProductsEntity) => {
            const isEditing = editMode.find((data) => data.id === item._id);
            return (
              <TableRow key={item._id} className="border-b-1">
                <TableCell>
                  <img
                    src={`http://localhost:8000/images/products/thumbnails/${item?.thumbnail}`}
                    alt={item.name}
                    className="w-16"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <Input
                      value={isEditing.price}
                      className="w-32"
                      type="number"
                      onChange={(e) => handleOnChange(e, item._id, "price")}
                      size="sm"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          handleCancel(item._id);
                        }
                      }}
                    />
                  ) : (
                    <span
                      onClick={() =>
                        handleEditData(item._id, item.price, item.quantity)
                      }
                      className="cursor-pointer"
                    >
                      {item.price}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Input
                      value={isEditing.quantity}
                      className="w-32"
                      type="number"
                      onChange={(e) => handleOnChange(e, item._id, "quantity")}
                      size="sm"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          handleCancel(item._id);
                        }
                      }}
                    />
                  ) : (
                    <span
                      onClick={() =>
                        handleEditData(item._id, item.price, item.quantity)
                      }
                      className="cursor-pointer"
                    >
                      {item.quantity}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
