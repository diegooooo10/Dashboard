import type { Category } from "../types";

export interface CartProductModel {
  quantity: number;
  uidProduct: string;
}
export interface CartItemModel {
  id: string;
  quantity: number;
  finalPrice: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
}
export interface CartModel {
  products: CartProductModel[];
}
