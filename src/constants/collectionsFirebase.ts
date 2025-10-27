export const PRODUCTS_COLLECTION = "Products";
export const USER_COLLECTION = "Users";
export const CART_COLLECTION = (uid: string) =>
  `${USER_COLLECTION}/${uid}/Cart/userCart`;
export const HISTORY_COLLECTION = (uid: string) =>
  `${USER_COLLECTION}/${uid}/History`;
export const DASHBOARD_COLLECTION = (uid: string) =>
  `${USER_COLLECTION}/${uid}/Dashboard/dashboard`;
