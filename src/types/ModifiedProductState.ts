import type { ProductModel } from "../models";

export type ModifiedProductState = {
  currentProduct: ProductModel | null;
  setProduct: (product: ProductModel) => void;
};
