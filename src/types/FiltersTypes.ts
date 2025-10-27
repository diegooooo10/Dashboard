import type { Category } from "./Category";
export type CategoryFilterType = Category | "Default";
export type ProductsFiltersType = {
  title: string;
  category: CategoryFilterType;
};
