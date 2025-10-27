type CheckboxProps = {
  id: string;
  isChecked: boolean;
  onChange: () => void;
  className?: string;
};

export const Checkbox = ({
  id,
  isChecked,
  onChange,
  className,
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      aria-label={isChecked ? "Checkbox checked" : "Checkbox unchecked"}
      className={`relative z-10 flex items-center w-12 h-8 rounded-full cursor-pointer transition-colors ${
        isChecked
          ? "bg-primary dark:bg-primary-dark"
          : "bg-border dark:bg-gray-300 "
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`
          absolute top-0 left-0 h-6 w-6 rounded-full bg-bg-card border border-border  transition-size ${
            isChecked ? "translate-x-7" : "translate-x-0"
          }`}
      />
    </label>
  );
};
