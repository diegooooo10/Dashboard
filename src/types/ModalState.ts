export type ModalState = {
  changeStateSidebar: (isOpenSidebar: boolean) => void;
  isOpenSidebar: boolean;
  Modal: Modals;
  changeModal: (modal: Modals) => void;
};
export type Modals =
  | "changePassword"
  | "confirmPassword"
  | "addProduct"
  | "modifiedProduct"
  | "confirmPasswordDeleteProduct"
  | "checkout"
  | "";
