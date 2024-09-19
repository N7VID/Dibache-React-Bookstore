export interface SubcategoriesResponse {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data;
}
export interface Data {
  subcategories?: SubcategoriesEntity[] | null;
}
export interface SubcategoriesEntity {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
