import { useState } from "react";
import type { FormChangePasswordValues } from "../../../schema";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { InputPassword } from "../../Common";

type FormChangePasswordUIProps = {
  messagePassword: string;
  control: Control<FormChangePasswordValues>;
  errors: FieldErrors<FormChangePasswordValues>;
  handleSubmit: UseFormHandleSubmit<FormChangePasswordValues>;
  onSubmit: SubmitHandler<FormChangePasswordValues>;
  isLoading: boolean;
};

export const FormChangePasswordUI = ({
  control,
  errors,
  handleSubmit,
  messagePassword,
  onSubmit,
  isLoading,
}: FormChangePasswordUIProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] =
    useState<boolean>(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 pb-4">
      <h3 className="font-bold text-center text-xl">Change Your Password</h3>
      <span
        className={` md:text-sm text-center text-xs ${
          messagePassword.includes("successfully")
            ? "text-success dark:text-success-dark"
            : "text-error dark:text-error-dark"
        } text-pretty px-1 `}
      >
        {messagePassword}
      </span>
      <InputPassword
        control={control}
        id="currentPassword"
        label="Current Password"
        isVisiblePassword={isVisiblePassword}
        togglePassword={() => setIsVisiblePassword((prev) => !prev)}
        errorPassword={errors.currentPassword}
      />
      <InputPassword
        control={control}
        id="newPassword"
        label="New Password"
        isVisiblePassword={isVisibleNewPassword}
        togglePassword={() => setIsVisibleNewPassword((prev) => !prev)}
        errorPassword={errors.newPassword}
      />
      <button
        type="submit"
        className="button disabled-button"
        disabled={isLoading}
      >
        Change Password
      </button>
    </form>
  );
};
