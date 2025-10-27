import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFormProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  control: Control<T>;
  type?: React.HTMLInputTypeAttribute;
  error?: FieldError;
  placeholder: string;
  render?: () => ReactNode;
  className?: string;
};
export const InputForm = <T extends FieldValues>({
  error,
  id,
  label,
  type,
  control,
  placeholder,
  className,
  render,
}: InputFormProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <div className={`${className} relative`}>
            <input
              type={type}
              placeholder={placeholder}
              id={id}
              {...field}
              className={` outline ${
                error
                  ? "outline-error dark:outline-error-dark "
                  : "dark:outline-border-dark outline-border focus:outline-primary dark:focus:outline-primary-dark  "
              } px-2 py-1 flex items-center rounded-md w-full bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark h-8 ${
                render && "px-8"
              }`}
            />
            {render && render()}
          </div>
        )}
      />
      <span className="min-h-6 md:text-sm text-xs text-error text-pretty px-1 md:max-w-80">
        {error && error.message}
      </span>
    </div>
  );
};
