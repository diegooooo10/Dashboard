import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputEditProfileProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder: string;
  isModified: boolean;
  className?: string;
  maxLength?: number;
};
export const InputEditProfile = <T extends FieldValues>({
  id,
  label,
  control,
  error,
  placeholder,
  className,
  isModified,
  maxLength,
}: InputEditProfileProps<T>) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <input
            type="text"
            id={id}
            maxLength={maxLength}
            {...field}
            className={`px-2 py-1 flex items-center rounded-md w-full outline-1 h-8 ${
              error
                ? "outline-error dark:outline-error-dark"
                : "outline-border dark:outline-border-dark focus:outline-primary dark:focus:outline-primary-dark "
            } ${
              !isModified && "bg-border dark:bg-border-dark cursor-not-allowed"
            }`}
            placeholder={placeholder}
            disabled={!isModified}
          />
        )}
      ></Controller>
    </div>
  );
};
