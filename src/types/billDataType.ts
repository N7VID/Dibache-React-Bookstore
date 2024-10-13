export interface IBill {
  id: string;
  image: string | undefined;
  name: string;
  endPrice: number;
  discount: number;
  totalPrice: number;
  count: number;
}
