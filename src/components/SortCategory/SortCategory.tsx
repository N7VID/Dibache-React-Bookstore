import { Input, Select, SelectItem } from "@nextui-org/react";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { SetURLSearchParams } from "react-router-dom";
import { ChangeEvent } from "react";

interface Params {
  name: string;
  q: string | null;
  sort: string | null;
  setSearchParams: SetURLSearchParams;
  handleSortType: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrder: (event: ChangeEvent<HTMLSelectElement>) => void;
  currentParams: {
    [k: string]: string;
  };
}

export default function SortCategory({
  name,
  q,
  sort,
  setSearchParams,
  handleSortType,
  handleSortOrder,
  currentParams,
}: Params) {
  return (
    <section className="w-full py-8 shadow-box bg-white rounded-lg my-4 px-10 flex justify-between items-center flex-col gap-8 md:flex-row">
      <h3 className="font-bold text-xl font-yekan">{name}</h3>
      <div className="flex items-center flex-col gap-4 md:flex-row">
        <Input
          isClearable
          labelPlacement="inside"
          placeholder="جستجو در دسته بندی"
          className="w-64"
          value={q || ""}
          onChange={(e) =>
            setSearchParams({ ...currentParams, q: e.target.value })
          }
          startContent={
            <SearchIcon className="text-black/60 dark:text-white/90 cursor-default flex-shrink-0" />
          }
        />
        <Select
          size="sm"
          label={"فیلتر بر اساس"}
          className="w-48"
          onChange={(event) => handleSortType(event)}
          selectedKeys={sort ? [sort.replace("-", "")] : undefined}
        >
          <SelectItem key={"name"} className="font-yekan">
            نام
          </SelectItem>
          <SelectItem key={"brand"} className="font-yekan">
            انتشارات
          </SelectItem>
          <SelectItem key={"quantity"} className="font-yekan">
            موجودی
          </SelectItem>
          <SelectItem key={"price"} className="font-yekan">
            قیمت
          </SelectItem>
          <SelectItem key={"discount"} className="font-yekan">
            تخفیف
          </SelectItem>
          <SelectItem key={"createdAt"} className="font-yekan">
            تاریخ ایجاد
          </SelectItem>
        </Select>
        <Select
          size="sm"
          label={"ترتیب"}
          className="w-36"
          onChange={(event) => handleSortOrder(event)}
          selectedKeys={[sort?.includes("-") ? "desc" : "asc"]}
        >
          <SelectItem key={"asc"} className="font-yekan">
            صعودی
          </SelectItem>
          <SelectItem key={"desc"} className="font-yekan">
            نزولی
          </SelectItem>
        </Select>
      </div>
    </section>
  );
}
