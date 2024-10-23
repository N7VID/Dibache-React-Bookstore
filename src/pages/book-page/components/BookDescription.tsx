import { ProductsEntity } from "../../../types/productType";

export default function BookDescription({ data }: { data: ProductsEntity }) {
  const name = data?.name.split("اثر");

  const ProductDescription = ({ description }: { description: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };
  return (
    <section className="flex flex-col gap-4 my-4 laptop:px-0 mobile:mp-6 px-4">
      <div>
        <h3 className="text-sm mobile:text-lg font-semibold text-[#222]">
          معرفی {name?.[0]}
        </h3>
      </div>
      <div className="max-w-[650px] text-[11px] mobile:text-sm text-value-gray">
        {<ProductDescription description={data?.description} />}
      </div>
    </section>
  );
}
