import { useEffect, useState } from "react";
import {
  loadConfirmPasswordSchema,
  type FormConfirmPasswordType,
  type FormConfirmPasswordValues,
} from "../../../schema";
import { useAuthStore, useModalStore, useSettingsStore } from "../../../store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteUserAndData } from "../../../services";
import { FormConfirmPasswordUI } from "./FormConfirmPasswordUI";
import { showToast } from "../../ShowToast";

export const FormConfirmPassword = () => {
  const [schema, setSchema] = useState<FormConfirmPasswordType | null>(null);
  const [messagePassword, setMessagePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeModal = useModalStore((state) => state.changeModal);
  const resetSettings = useSettingsStore((state) => state.resetSettings);
  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);
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
    if (!user?.email || isLoading) return;
    setIsLoading(true);
    const message = await deleteUserAndData(
      user,
      user.email,
      values.confirmPassword
    );
    setMessagePassword(message);
    if (message.includes("successfully")) {
      logout();
      resetSettings();
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
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
};
