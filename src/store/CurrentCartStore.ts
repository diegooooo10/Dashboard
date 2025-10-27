import { create } from "zustand";
import type { CheckoutState } from "../types";

export const useCurrentCartStore = create<CheckoutState>((set) => ({
  currentCartItemsStore: [],
  setCurrentCartItemsStore: (cartItems) =>
    set(() => ({ currentCartItemsStore: cartItems })),
  currentCartStore: { products: [], totalPrice: 0 },
  setCurrentCartStore: (cart) => set(() => ({ currentCartStore: cart })),
}));
