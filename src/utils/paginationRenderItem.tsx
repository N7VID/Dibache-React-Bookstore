import {
  cn,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react";
import { ChevronIcon } from "../assets/svg/ChevronIcon";

export const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onNext}
      >
        <ChevronIcon className="rotate-180" />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onPrevious}
      >
        <ChevronIcon className="rotate-0" />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }
  return (
    <button
      key={key}
      ref={ref}
      className={cn(
        className,
        isActive &&
          "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};
