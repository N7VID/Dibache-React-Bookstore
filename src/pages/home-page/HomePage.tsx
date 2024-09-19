import { Button } from "@nextui-org/react";

export default function HomePage() {
  return (
    <>
      <section className="h-[120px] mobile:h-[150px] md:h-[300px] w-full bg-persian-green/80 flex justify-center items-center cursor-default px-4">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl mobile:text-2xl md:text-3xl font-bold text-white border-b-2 pb-4 border-white">
            دیباچه، کتاب‌ها آغازگر هر داستان‌اند!
          </h2>
          <div className="text-center text-white text-[12px] pt-4 pb-6 hidden md:block">
            <p>از تازه‌های نشر تا کلاسیک‌های ماندگار،</p>
            <p>در دیباچه کتابی برای هر سلیقه‌ای خواهید یافت.</p>
          </div>
          <Button
            className="w-32 bg-white text-medium hidden md:block"
            size="sm"
            radius="full"
          >
            مشاهده
          </Button>
        </div>
        <img
          src="/src/assets/images/hero-1.png"
          alt="hero-image"
          className="md:w-[450px] mobile:w-56 w-36 h-[120px] mobile:h-auto"
        />
      </section>
      <div className="LayoutContainer">سلام</div>
    </>
  );
}
