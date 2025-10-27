import { lazy } from "react";
import { useModalStore } from "../../store";
import { ModalProvider } from "./ModalProvider";

const ChangePassword = lazy(() => import("./UI/ChangePassword"));
const ConfirmPassword = lazy(() => import("./UI/ConfirmPassword"));
const AddProduct = lazy(() => import("./UI/AddProduct"));
const ModifiedProduct = lazy(() => import("./UI/ModifiedProduct"));
const DeleteProduct = lazy(() => import("./UI/DeleteProduct"));
const Checkout = lazy(() => import("./UI/Checkout"));

export const Modal = () => {
  const modal = useModalStore((state) => state.Modal);
  return (
    <ModalProvider>
      {modal === "changePassword" && <ChangePassword />}
      {modal === "confirmPassword" && <ConfirmPassword />}
      {modal === "addProduct" && <AddProduct />}
      {modal === "modifiedProduct" && <ModifiedProduct />}
      {modal === "confirmPasswordDeleteProduct" && <DeleteProduct />}
      {modal === "checkout" && <Checkout />}
    </ModalProvider>
  );
};
