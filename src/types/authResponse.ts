export interface authResponse {
  status: string;
  token: Token;
  data: Data;
}
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface Data {
  user: User;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  wishlist?: null[] | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}
