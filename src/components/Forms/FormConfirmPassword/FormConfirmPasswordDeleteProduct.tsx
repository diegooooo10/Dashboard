import { useEffect, useState } from "react";
import {
  loadConfirmPasswordSchema,
  type FormConfirmPasswordType,
  type FormConfirmPasswordValues,
} from "../../../schema";
import {
  useAuthStore,
  useCurrentProductStore,
  useModalStore,
} from "../../../store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteProduct } from "../../../services";
import { FormConfirmPasswordUI } from "./FormConfirmPasswordUI";
import { showToast } from "../../ShowToast";

export const FormConfirmPasswordDeleteProduct = () => {
  const [schema, setSchema] = useState<FormConfirmPasswordType | null>(null);
  const [messagePassword, setMessagePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeModal = useModalStore((state) => state.changeModal);
  const { currentProduct } = useCurrentProductStore();
  const { user } = useAuthStore();

  useEffect(() => {
    loadConfirmPasswordSchema().then((schema: FormConfirmPasswordType) =>
      setSchema(schema)
    );
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormConfirmPasswordValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormConfirmPasswordValues> = async (values) => {
    if (!currentProduct?.id || !user?.email) {
      setMessagePassword("");
      changeModal("");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const message = await deleteProduct(
      currentProduct.id,
      user.email,
      values.confirmPassword,
      user
    );

    setMessagePassword(message);
    if (message.includes("successfully")) {
      changeModal("");
      showToast(message);
    } else {
      setTimeout(() => {
        setMessagePassword("");
      }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <FormConfirmPasswordUI
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      messagePassword={messagePassword}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
