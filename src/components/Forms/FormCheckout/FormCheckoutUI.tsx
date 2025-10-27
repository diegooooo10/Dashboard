import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { CartItemModel } from "../../../models";
import type { FormCheckoutValues } from "../../../schema";
import { InputForm, SelectForm } from "../../Common";
import { PaymentMethods } from "../../../constants";

type FormCheckoutUIProps = {
  cart: CartItemModel[];
  control: Control<FormCheckoutValues>;
  onSubmit: (values: FormCheckoutValues) => void;
  handleSubmit: UseFormHandleSubmit<FormCheckoutValues>;
  errors: FieldErrors<FormCheckoutValues>;
  isLoading: boolean;
  messageCheckout: string;
};
export const FormCheckoutUI = ({
  cart,
  control,
  errors,
  handleSubmit,
  isLoading,
  messageCheckout,
  onSubmit,
}: FormCheckoutUIProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-center text-xl">Checkout</h3>
      <span
        className={` md:text-sm text-center flex justify-center items-center text-xs ${
          messageCheckout.includes("successfully")
            ? "text-success dark:text-success-dark"
            : "text-error dark:text-error-dark"
        } text-pretty px-1 `}
      >
        {messageCheckout}
      </span>
      <InputForm
        control={control}
        id="address"
        label="Address"
        placeholder="Enter your address"
        error={errors.address}
      />
      <SelectForm
        control={control}
        id="paymentMethod"
        label="Payment Method"
        options={PaymentMethods}
        error={errors.paymentMethod}
      />
      <section className="flex flex-col my-4 border-b border-border dark:border-border-dark pb-4 max-h-96 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm "
          >
            <span className="text-text dark:text-text-dark font-semibold">
              {item.title}
            </span>

            <span className="text-text-secondary dark:text-text-secondary-dark">
              x{item.quantity}
            </span>
          </div>
        ))}
      </section>
      <section className=" flex justify-between items-center border-b border-border dark:border-border-dark pb-4 mb-4">
        <span>Total:</span>
        <span>{`$${cart.reduce(
          (acc, curr) => curr.finalPrice + acc,
          0
        )}`}</span>
      </section>
      <button className="button disabled-button" disabled={isLoading}>
        Confirm Purchase
      </button>
    </form>
  );
};
