export default function MobileNavbar() {
  return (
    <div className="md:hidden block px-6 sm:px-20 py-3">
      <ul className="flex justify-between items-center">
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/home-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">صفحه اصلی</p>
        </li>
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/category-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">دسته ها</p>
        </li>
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/cart-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">سبد خرید</p>
        </li>
        <li className="flex flex-col items-center">
          <img
            src="/src/assets/svg/user-black.svg"
            className="w-6 sm:w-7"
            alt=""
          />
          <p className="sm:text-sm text-[12px]">پروفایل</p>
        </li>
      </ul>
    </div>
  );
}
