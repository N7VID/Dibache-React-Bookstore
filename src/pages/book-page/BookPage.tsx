import { useParams } from "react-router-dom";
import { useGetServices } from "../../hooks/useGetServices";
import { getProductsById } from "../../queryhooks/product";

export default function BookPage() {
  const { id } = useParams();
  const { data } = useGetServices({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
    options: {
      enabled: !!id,
    },
  });

  return <div>BookPage</div>;
}
