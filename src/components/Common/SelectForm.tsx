import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

type SelectFormProps<T extends FieldValues, O extends string = string> = {
  label: string;
  id: Path<T>;
  control: Control<T>;
  error?: FieldError;
  className?: string;
  options: O[];
};

export const SelectForm = <T extends FieldValues>({
  error,
  id,
  label,
  control,
  className,
  options,
}: SelectFormProps<T>) => {
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
            <select
              {...field}
              className={`outline px-2 py-1 h-8 flex items-center rounded-md w-full bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark ${
                error
                  ? "dark:outline-error-dark outline-error  "
                  : "outline-border dark:outline-border-dark focus:outline-primary dark:focus:outline-primary-dark "
              }`}
              id={id}
            >
              <option value="" hidden disabled>
                Select a option
              </option>
              {options.map((opt) => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      <span className="min-h-6 md:text-sm text-xs text-error text-pretty px-1 md:max-w-80">
        {error && error.message}
      </span>
    </div>
  );
};
