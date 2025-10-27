import { useEffect } from "react";
import { AppProvider } from "./providers";
import { useAuthStore, useModalStore } from "./store";

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const { Modal } = useModalStore();

  useEffect(() => {
    if (Modal !== "") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [Modal]);

  return <AppProvider />;
};

export default App;
