import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "@nextui-org/react";
import { PATHS } from "../../configs/paths.config";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-yekan cursor-default gap-10 bg-ghost-white">
      <div className="w-[150px] sm:w-[300px]">
        <DotLottieReact
          src="https://lottie.host/398768d4-0b51-4173-9705-a12e1e49d5d3/tTqVxvOgo5.json"
          loop
          autoplay
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-base sm:text-xl font-semibold">
          صفحه مورد نظر یافت نشد ):
        </p>
        <Link href={PATHS.HOME} className="text-sm sm:text-base">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
