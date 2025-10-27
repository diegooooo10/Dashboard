import { useForm, type SubmitHandler } from "react-hook-form";
import { FormCheckoutUI } from "./FormCheckoutUI";
import {
  LoadFormCheckoutSchema,
  type FormCheckoutType,
  type FormCheckoutValues,
} from "../../../schema";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAuthStore,
  useCurrentCartStore,
  useModalStore,
} from "../../../store";
import { addCartToHistory } from "../../../services";
import { showToast } from "../../ShowToast";
import type { PaymentMethod } from "../../../types";

export const FormCheckout = () => {
  const [schema, setSchema] = useState<FormCheckoutType | null>(null);
  const [messageCheckout, setMessageCheckout] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeModal = useModalStore((state) => state.changeModal);
  const {
    currentCartItemsStore,
    setCurrentCartItemsStore,
    setCurrentCartStore,
  } = useCurrentCartStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    LoadFormCheckoutSchema().then((schema: FormCheckoutType) =>
      setSchema(schema)
    );
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCheckoutValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      address: "",
      paymentMethod: "",
    },
  });
  const onSubmit: SubmitHandler<FormCheckoutValues> = async (values) => {
    if (!user?.uid) return;
    setIsLoading(true);
    const message = await addCartToHistory(
      user.uid,
      currentCartItemsStore,
      values.address,
      values.paymentMethod as PaymentMethod
    );

    if (message.includes("successfully")) {
      showToast(message);
      changeModal("");

      setCurrentCartItemsStore([]);
      setCurrentCartStore({
        products: [],
      });
    } else {
      setMessageCheckout(message);
      setTimeout(() => {
        setMessageCheckout("");
      }, 3000);
      setIsLoading(false);
    }
  };
  return (
    <FormCheckoutUI
      cart={currentCartItemsStore}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={isLoading}
      messageCheckout={messageCheckout}
    />
  );
};
