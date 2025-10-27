import type { CartItemModel, CartModel } from "../models";
export type CheckoutState = {
  currentCartItemsStore: CartItemModel[];
  setCurrentCartItemsStore: (cartItems: CartItemModel[]) => void;
  currentCartStore: CartModel;
  setCurrentCartStore: (cartItems: CartModel) => void;
};
