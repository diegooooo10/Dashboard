import { create } from "zustand";
import type { ModalState } from "../types";

export const useModalStore = create<ModalState>((set) => ({
  isOpenSidebar: false,
  changeStateSidebar: (isOpenSidebar) => set({ isOpenSidebar }),
  Modal: "",
  changeModal: (modal) => set({ Modal: modal }),
}));
