import { useState } from "react";
import type { FormConfirmPasswordValues } from "../../../schema";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { InputPassword } from "../../Common";
type FormConfirmPasswordUIProps = {
  messagePassword: string;
  control: Control<FormConfirmPasswordValues>;
  errors: FieldErrors<FormConfirmPasswordValues>;
  handleSubmit: UseFormHandleSubmit<FormConfirmPasswordValues>;
  onSubmit: SubmitHandler<FormConfirmPasswordValues>;
  isLoading: boolean;
};
export const FormConfirmPasswordUI = ({
  control,
  errors,
  handleSubmit,
  messagePassword,
  onSubmit,
  isLoading,
}: FormConfirmPasswordUIProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between min-h-full gap-2 pb-4"
    >
      <h3 className="font-bold text-center text-xl">Confirm Your Password</h3>
      <span
        className={`md:text-sm text-center text-xs text-pretty px-1 ${
          messagePassword.includes("successfully")
            ? "text-success dark:text-success-dark"
            : "text-error dark:text-error-dark"
        }`}
      >
        {messagePassword}
      </span>

      <InputPassword
        control={control}
        id="confirmPassword"
        label="Confirm your password"
        isVisiblePassword={isVisiblePassword}
        togglePassword={() => setIsVisiblePassword((prev) => !prev)}
        errorPassword={errors.confirmPassword}
      />
      <button
        type="submit"
        className="button disabled-button"
        disabled={isLoading}
      >
        Confirm Password
      </button>
    </form>
  );
};
