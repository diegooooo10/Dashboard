import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { IconEyeClose, IconEyeOpen, IconLock } from "../Icons";
import { InputForm } from "./InputForm";
type InputPasswordProps<T extends FieldValues> = {
  errorPassword?: FieldError;
  isVisiblePassword: boolean;
  control: Control<T>;
  togglePassword: () => void;
  id: Path<T>;
  label?: string;
};
export const InputPassword = <T extends FieldValues>({
  control,
  errorPassword,
  isVisiblePassword,
  togglePassword,
  id,
  label = "Password",
}: InputPasswordProps<T>) => {
  return (
    <InputForm
      error={errorPassword}
      id={id}
      label={label}
      type={isVisiblePassword ? "text" : "password"}
      control={control}
      placeholder={`${isVisiblePassword ? "password" : "********"}`}
      render={() => (
        <div className="flex justify-between ">
          <IconLock
            className="absolute left-2 top-[6px] text-text-secondary/50 dark:text-text-secondary-dark/50"
            size={20}
          />
          <button
            type="button"
            aria-label="change visibility password"
            onClick={togglePassword}
          >
            {isVisiblePassword ? (
              <IconEyeOpen
                className="absolute right-2 top-[6px] cursor-pointer"
                size={20}
              />
            ) : (
              <IconEyeClose
                className="absolute right-2 top-[6px] cursor-pointer"
                size={20}
              />
            )}
          </button>
        </div>
      )}
    />
  );
};
