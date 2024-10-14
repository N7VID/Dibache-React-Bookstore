import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px]">
        <DotLottieReact
          src="https://lottie.host/164f3ba8-7bb1-4588-8063-c61066cfa671/3qnhMBg7uS.json"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
