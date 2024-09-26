export interface GetProductsByIdResponse {
  status: string;
  data: Data;
}
export interface Data {
  product: Product;
}
export interface Product {
  rating: Rating;
  _id: string;
  category: Category;
  subcategory: Subcategory;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  discount: number;
  description: string;
  thumbnail: string;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
export interface Rating {
  rate: number;
  count: number;
}
export interface Category {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
export interface Subcategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
