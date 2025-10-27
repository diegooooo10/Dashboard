import type { Category } from "../types";

export interface ProductModel {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
}
