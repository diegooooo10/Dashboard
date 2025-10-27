import type { ProductModel } from "../models";
import type { ProductsFiltersType } from "../types";

export const getFilteredProducts = (
  data: ProductModel[],
  filters: ProductsFiltersType
): ProductModel[] => {
  return data.filter((product) => {
    const hasProductWithTitle = product.title.includes(
      filters.title.toLowerCase()
    );
    const hasProductInCategory =
      product.category === filters.category || filters.category == "Default";
    return hasProductInCategory && hasProductWithTitle;
  });
};
