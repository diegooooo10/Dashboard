import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes";
import { Modal } from "../components";
import { Toaster } from "react-hot-toast";

export const AppProvider = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Modal />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{ duration: 2000 }}
      />
    </BrowserRouter>
  );
};
