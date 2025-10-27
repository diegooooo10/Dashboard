import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { InputForm, InputPassword } from "../../Common";
import { IconEmail } from "../../Icons";
import type { FormAuthValues } from "../../../schema";

type FormAuthUIProps = {
  isRegistered: boolean;
  isVisiblePassword: boolean;
  togglePassword: () => void;
  switchAuth: () => void;
  control: Control<FormAuthValues>;
  errors: FieldErrors<FormAuthValues>;
  handleSubmit: UseFormHandleSubmit<FormAuthValues>;
  onSubmit: SubmitHandler<FormAuthValues>;
  message: string;
  isLoading: boolean;
};

export const FormAuthUI = ({
  isRegistered,
  isVisiblePassword,
  togglePassword,
  control,
  switchAuth,
  errors,
  handleSubmit,
  onSubmit,
  message,
  isLoading,
}: FormAuthUIProps) => {
  return (
    <section className="card px-6 py-4 min-w-full md:min-w-96">
      <h1 className="text-xl font-bold text-center">
        {isRegistered ? "Welcome back!" : "Create your account"}
      </h1>
      <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center">
        {isRegistered
          ? "Log in with your email and password"
          : "Fill in your details to get started"}
      </p>
      <span
        className={`md:text-sm text-xs text-pretty flex text-center justify-center ${
          message.includes("successfully")
            ? "text-success dark:text-success-dark"
            : "text-error dark:text-error-dark"
        }   ${message ? "my-4" : "mt-4"}`}
      >
        {message}
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1">
        <InputForm
          error={errors.email}
          id={"email"}
          label="Email"
          type="email"
          control={control}
          placeholder="example@gmail.com"
          render={() => (
            <IconEmail
              className="absolute left-2 top-[6px] text-text-secondary/50 dark:text-text-secondary-dark/50"
              size={20}
            />
          )}
        />
        <InputPassword
          control={control}
          errorPassword={errors.password}
          id="password"
          isVisiblePassword={isVisiblePassword}
          togglePassword={togglePassword}
        />
        <button type="submit" className="button">
          {isRegistered ? "Log In" : "Sign Up"}
        </button>
      </form>
      <div className="flex items-center gap-2 my-4">
        <span className="flex-1 h-px bg-border dark:bg-border-dark"></span>
        <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
          or
        </span>
        <span className="flex-1 h-px bg-border dark:bg-border-dark"></span>
      </div>
      <button
        type="button"
        onClick={switchAuth}
        disabled={isLoading}
        className="cursor-pointer text-text-secondary dark:text-text-secondary-dark w-full text-sm hover:text-primary dark:hover:text-primary-dark transition-theme disabled-button"
      >
        {isRegistered
          ? "Don’t have an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </section>
  );
};
