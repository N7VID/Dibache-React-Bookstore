import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { PATHS } from "../../configs/paths.config";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

export default function Footer() {
  return (
    <footer className="shadow-footer shadow-black w-full bg-white bottom-0">
      <div className="LayoutContainer md:flex flex-col justify-center hidden">
        <div className="flex flex-col justify-center items-center py-14 border-b-2 gap-6">
          <h3 className="cursor-default">
            تازه‌های دیباچه را در ایمیل خود ببینید
          </h3>
          <form className="flex gap-2 w-[450px] justify-center items-center flex-row">
            <Input
              placeholder="نشانی ایمیل"
              type="email"
              radius="full"
              variant="bordered"
            />
            <Button className="w-1/2 bg-persian-green text-white" radius="full">
              ثبت نام در خبرنامه
            </Button>
          </form>
        </div>
        <div className="flex justify-between items-center px-20 py-8">
          <div className="flex flex-col gap-3">
            <ul className="flex gap-6 text-[13px]">
              <Link to={PATHS.HOME}>
                <li className="text-[#777] hover:text-persian-green transition">
                  تماس با ما
                </li>
              </Link>
              <Link to={PATHS.HOME}>
                <li className="text-[#777] hover:text-persian-green transition">
                  درباره ما
                </li>
              </Link>
              <Link to={PATHS.HOME}>
                <li className="text-[#777] hover:text-persian-green transition">
                  شرایط و ضوابط
                </li>
              </Link>
            </ul>
            <p className="text-[#777] text-[13px]">
              کلیه حقوق برای{" "}
              <Link to={PATHS.HOME}>
                <span className="text-persian-green cursor-pointer">
                  دیباچه
                </span>
              </Link>{" "}
              محفوظ است.
            </p>
          </div>
          <div>
            <ul className="flex justify-center items-center gap-4">
              <li>
                <a href="https://github.com/N7VID" target="_blank">
                  <img
                    src="/src/assets/svg/icons8-github.svg"
                    alt=""
                    className="w-9"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/navidaliakbari/"
                  target="_blank"
                >
                  <img
                    src="/src/assets/svg/icons8-linkedin.svg"
                    alt=""
                    className="w-8"
                  />
                </a>
              </li>
              <li>
                <a href="https://t.me/N7VID" target="_blank">
                  <img
                    src="/src/assets/svg/icons8-telegram-app.svg"
                    alt=""
                    className="w-8"
                  />
                </a>
              </li>
              <li>
                <a href="mailto:navidaliakbari.dev@gmail.com" target="_blank">
                  <img
                    src="/src/assets/svg/icons8-gmail.svg"
                    alt=""
                    className="w-7"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MobileNavbar />
    </footer>
  );
}
