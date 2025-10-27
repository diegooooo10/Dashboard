import { useModalStore, useSettingsStore } from "../../store";
import { IconLock, IconShield } from "../Icons";
import { Checkbox } from "./Checkbox";

export const Security = () => {
  const { changeModal } = useModalStore();
  const {
    settings: { twoFactorAuth },
    changeStateTwoFactorAuth,
  } = useSettingsStore();
  return (
    <section className="card p-5">
      <h3 className="font-bold text-lg flex items-center gap-2 ">
        <IconShield /> Security
      </h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Manage your account security Settings
      </p>
      <div className="grid grid-cols-[1fr_auto] gap-2 my-4">
        <div>
          <h4 className="font-semibold">Two-Factor Authentication</h4>
          <p className="text-text-secondary dark:text-text-secondary-dark text-sm">
            Add an extra layer of security to your account
          </p>
        </div>
        <Checkbox
          id={"two-factor"}
          isChecked={twoFactorAuth}
          onChange={changeStateTwoFactorAuth}
          className="place-self-center"
        />
      </div>
      <hr className="border-divider dark:border-divider-dark border-[1px]" />
      <div className=" my-4">
        <h4 className="font-semibold">Password</h4>
        <button
          className="button py-2 w-fit mt-1 px-4 flex items-center justify-center gap-2 hover:bg-bg-dark bg-bg-card-dark dark:hover:bg-bg dark:bg-bg-card dark:text-text text-text-dark"
          onClick={() => changeModal("changePassword")}
        >
          <IconLock size={20} /> Change Password
        </button>
      </div>
    </section>
  );
};
