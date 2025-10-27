import type { PaymentMethod } from "../types";
import type { CartItemModel } from "./Cart";

export interface HistoryModel {
  address: string;
  paymentMethod: PaymentMethod;
  id: string;
  date: string;
  totalPrice: number;
  Cart: CartItemModel[];
}
