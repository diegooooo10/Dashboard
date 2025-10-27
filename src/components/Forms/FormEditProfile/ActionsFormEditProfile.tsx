import type { UseFormReset } from "react-hook-form";
import type { FormEditProfileValues } from "../../../schema";
import { IconCheck, IconClose, IconPencil } from "../../Icons";

type ActionsFormEditProfileProps = {
  isModified: boolean;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
  reset: UseFormReset<FormEditProfileValues>;
};
export const ActionsFormEditProfile = ({
  isModified,
  setIsModified,
  reset,
}: ActionsFormEditProfileProps) => {
  return (
    <div className="flex gap-2">
      {!isModified && (
        <button
          type="button"
          onClick={() => {
            setIsModified(true);
          }}
          className="flex items-center gap-2 rounded-md border border-border dark:border-border-dark px-3 py-1.5 font-medium cursor-pointer"
        >
          Edit
          <IconPencil
            className=" text-secondary dark:text-secondary-dark"
            size={20}
          />
        </button>
      )}
      {isModified && (
        <>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md border border-border dark:border-border-dark px-3 py-1.5 font-medium cursor-pointer"
          >
            Save
            <IconCheck
              className="text-secondary dark:text-secondary-dark"
              size={20}
            />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-border dark:border-border-dark px-3 py-1.5 font-medium cursor-pointer"
            onClick={() => {
              setIsModified(false);
              reset();
            }}
          >
            Cancel
            <IconClose className=" text-secondary" size={20} />
          </button>
        </>
      )}
    </div>
  );
};
