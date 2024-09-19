export interface OrdersByIdResponse {
  status: string;
  data: Data;
}
export interface Data {
  order: Order;
}
export interface Order {
  _id: string;
  user: User;
  products?: ProductsEntity[] | null;
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  wishlist?: null[] | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ProductsEntity {
  product: Product;
  count: number;
  _id: string;
}
export interface Product {
  rating: Rating;
  _id: string;
  category: string;
  subcategory: string;
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
