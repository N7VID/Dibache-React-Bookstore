import { ENDPOINTS } from "../../constants";
import { httpRequest } from "../../services/http-request";

export const postCategories = async (data: {
  name: string;
  icon: FileList;
}) => {
  const url = ENDPOINTS.CATEGORIES;
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.icon.length > 0) {
    formData.append("icon", data.icon[0]);
  }
  const response = await httpRequest.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
