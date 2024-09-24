import { ENDPOINTS } from "../../constants";
import { AddProduct } from "../../pages/books-page/components/AddProductForm/schema";
import { httpRequest } from "../../services/http-request";

export const postProducts = async (data: AddProduct) => {
  const url = ENDPOINTS.PRODUCTS;
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("subcategory", data.subcategory);
  formData.append("price", data.price.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("discount", data.discount.toString());
  formData.append("brand", data.brand);
  formData.append("description", data.description);
  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail[0]);
  }
  if (data.images && data.images.length > 0) {
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
  }

  const response = await httpRequest.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};