import { useModalStore } from "../../store";
import { IconTrash } from "../Icons";

export const DangerZone = () => {
  const changeModal = useModalStore((state) => state.changeModal);
  return (
    <section className="bg-bg-card dark:bg-bg-card-dark rounded-md border-red-400  border text-text dark:text-text-dark p-5 transition-theme">
      <h3 className="font-semibold text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
        <IconTrash /> Danger Zone
      </h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Irreversible actions that affect your acount
      </p>
      <div className="grid gap-2">
        <h4 className="font-semibold text-red-700 dark:text-red-400">
          Delete Account
        </h4>

        <span className="text-text-secondary dark:text-text-secondary-dark text-sm -mt-1">
          Permanetly delete your account and all associated data. This actions
          cannot be undone
        </span>

        <button
          className=" button bg-error dark:bg-red-800 hover:bg-red-900 py-2 w-fit px-4"
          onClick={() => changeModal("confirmPassword")}
        >
          Delete Account
        </button>
      </div>
    </section>
  );
};
