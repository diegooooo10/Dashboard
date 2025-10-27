import { useCallback, useEffect, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "../../store";
import { IconClose } from "../Icons";

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const { Modal, changeModal } = useModalStore();
  const modal = document.getElementById("modal");

  const closeModal = useCallback(() => {
    changeModal("");
  }, [changeModal]);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (Modal !== "") {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal, Modal]);
  if (!modal || Modal === "") return;

  return createPortal(
    <div
      className="fixed z-[999] inset-0 bg-black/70 flex items-center justify-center px-2"
      onClick={closeModal}
    >
      <div
        className="relative card py-10 px-4 md:min-w-[400px] w-full md:w-auto "
        onClick={handleContentClick}
      >
        <button
          onClick={closeModal}
          className="cursor-pointer absolute right-2 top-2"
          aria-label="close modal"
        >
          <IconClose className="text-text dark:text-text-dark" />
        </button>
        {children}
      </div>
    </div>,
    modal
  );
};
