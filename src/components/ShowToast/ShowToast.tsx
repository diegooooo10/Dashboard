import toast from "react-hot-toast";
import { IconClose, IconCheck } from "../Icons";

export const showToast = (message: string) => {
  const type: "error" | "success" = message.includes("successfully")
    ? "success"
    : "error";

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full card flex items-center p-5 gap-2`}
    >
      <div
        className={`flex items-center justify-center rounded-full font-bold p-1 text-text-dark ${
          type === "success" ? "bg-success" : "bg-red-700"
        }`}
      >
        {type === "success" ? <IconCheck size={14} /> : <IconClose size={14} />}
      </div>
      <p className="font-semibold text-sm">{message}</p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-auto text-text-secondary dark:text-text-secondary-dark cursor-pointer"
      >
        ×
      </button>
    </div>
  ));
};
