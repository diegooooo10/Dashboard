import { useEffect, useState } from "react";
import {
  loadChangePasswordSchema,
  type FormChangePasswordType,
  type FormChangePasswordValues,
} from "../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthStore, useModalStore } from "../../../store";
import { updatePasswordUser } from "../../../services";
import { FormChangePasswordUI } from "./FormChangePasswordUI";
import { showToast } from "../../ShowToast";

export const FormChangePassword = () => {
  const [schema, setSchema] = useState<FormChangePasswordType | null>(null);
  const [messagePassword, setMessagePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeModal = useModalStore((state) => state.changeModal);

  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    loadChangePasswordSchema().then((schema: FormChangePasswordType) =>
      setSchema(schema)
    );
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormChangePasswordValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const onSubmit: SubmitHandler<FormChangePasswordValues> = async (values) => {
    if (isLoading || !user?.email) return;
    setIsLoading(true);
    const message = await updatePasswordUser(values, user.email, user);
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
    <FormChangePasswordUI
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      messagePassword={messagePassword}
      isLoading={isLoading}
    />
  );
};
