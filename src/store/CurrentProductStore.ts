import { create } from "zustand";
import type { ModifiedProductState } from "../types";

export const useCurrentProductStore = create<ModifiedProductState>((set) => ({
  currentProduct: null,
  setProduct: (product) => set({ currentProduct: product }),
}));
