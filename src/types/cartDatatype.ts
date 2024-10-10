export interface Icart {
  user: string;
  products: { product: string; count: number }[];
  deliveryDate?: string;
}
