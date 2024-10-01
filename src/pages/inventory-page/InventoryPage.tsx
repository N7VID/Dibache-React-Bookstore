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
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getProducts } from "../../queryhooks/product";
import { getProductsResponse, ProductsEntity } from "../../types/productType";
import { renderItem } from "../../utils/paginationRenderItem";
import { httpRequest } from "../../services/http-request";
import { ENDPOINTS } from "../../constants";
import { toPersianNumber } from "../../utils/toPersianNumber";

interface EditModeType {
  id: string;
  value: number | string;
}

interface EditBodyType {
  id: string;
  body: { quantity?: number | string; price?: number | string };
}

export default function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editQuantity, setEditQuantity] = useState<EditModeType[]>([]);
  const [editPrice, setEditPrice] = useState<EditModeType[]>([]);
  const [changeList, setChangeList] = useState<EditBodyType[]>([]);
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

  const { data, isLoading, refetch } = useGetServices<getProductsResponse>({
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

  const currentParams = Object.fromEntries([...searchParams]);
  function handlePriceOrderColumn() {
    const newSort = currentParams.sort === "price" ? "-price" : "price";
    setSearchParams({ ...currentParams, sort: newSort });
  }
  function handleInventoryOrderColumn() {
    const newSort =
      currentParams.sort === "quantity" ? "-quantity" : "quantity";
    setSearchParams({ ...currentParams, sort: newSort });
  }
  function handlePageChange(page: number) {
    setSearchParams({ ...currentParams, page: page.toString(), limit });
  }

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    field: "price" | "quantity"
  ) {
    if (field === "quantity") {
      setEditQuantity((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: +e.target.value } : item
        )
      );
    } else {
      setEditPrice((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: +e.target.value } : item
        )
      );
    }
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    id: string,
    field: "price" | "quantity"
  ) {
    if (e.key === "Enter") {
      const value = Number(e.currentTarget.value);
      setChangeList((prev) => {
        const updatedList = [...prev];
        const existingIndex = updatedList.findIndex((item) => item.id === id);
        if (existingIndex > -1) {
          updatedList[existingIndex].body[field] = value;
        } else {
          updatedList.push({ id, body: { [field]: value } });
        }
        return updatedList;
      });
    }
    if (e.key === "Escape") {
      handleCancel(id, field);
    }
  }

  function handleSave() {
    const promiseList = changeList.map((item) =>
      httpRequest.patch(`${ENDPOINTS.PRODUCTS}/${item.id}`, item.body)
    );
    Promise.all(promiseList)
      .then(() => {
        refetch();
        setEditPrice([]);
        setEditQuantity([]);
        setChangeList([]);
      })
      .catch((error) => console.log(error.message));
  }

  function handleCancel(id: string, field: "price" | "quantity") {
    const price = editPrice.find((price) => price.id === id);
    const quantity = editQuantity.find((quantity) => quantity.id === id);
    console.log(price, quantity);

    if (field === "price") {
      setEditPrice((prev) => prev.filter((data) => data.id !== id));
      setChangeList((prev) =>
        prev
          .map((data) =>
            data.id === id
              ? { ...data, body: { ...data.body, price: undefined } }
              : data
          )
          .filter((data) => data.body.quantity || data.body.price !== undefined)
      );
    } else {
      setEditQuantity((prev) => prev.filter((data) => data.id !== id));
      setChangeList((prev) =>
        prev
          .map((data) =>
            data.id === id
              ? { ...data, body: { ...data.body, quantity: undefined } }
              : data
          )
          .filter((data) => data.body.price || data.body.quantity !== undefined)
      );
    }
  }

  return (
    <div className="LayoutContainer pt-[100px]">
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
            const quantity = editQuantity.find(
              (quantity) => quantity.id === item._id
            );
            const price = editPrice.find(
              (quantity) => quantity.id === item._id
            );
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
                  {price ? (
                    <Input
                      dir="ltr"
                      value={price.value.toString()}
                      className="w-28"
                      type="number"
                      onChange={(e) => handleOnChange(e, item._id, "price")}
                      size="sm"
                      onKeyDown={(e) => handleKeyDown(e, item._id, "price")}
                    />
                  ) : (
                    <span
                      onClick={() =>
                        setEditPrice((prev) => [
                          ...prev,
                          { id: item._id, value: item.price },
                        ])
                      }
                      className="cursor-pointer"
                    >
                      {toPersianNumber(item.price)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {quantity ? (
                    <Input
                      dir="ltr"
                      value={quantity.value.toString()}
                      className="w-28"
                      type="number"
                      onChange={(e) => handleOnChange(e, item._id, "quantity")}
                      size="sm"
                      onKeyDown={(e) => handleKeyDown(e, item._id, "quantity")}
                    />
                  ) : (
                    <span
                      onClick={() =>
                        setEditQuantity((prev) => [
                          ...prev,
                          { id: item._id, value: item.quantity },
                        ])
                      }
                      className="cursor-pointer"
                    >
                      {toPersianNumber(item.quantity)}
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
