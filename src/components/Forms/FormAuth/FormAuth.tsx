import { useEffect, useState } from "react";
import {
  loadAuthSchema,
  type FormAuthType,
  type FormAuthValues,
} from "../../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAuthUI } from "./FormAuthUI";
import { CircleLoader } from "../../Loaders";
import { AuthUser } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import { showToast } from "../../ShowToast";

export const FormAuth = () => {
  const [schema, setSchema] = useState<FormAuthType | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const setUserConfiguration = useAuthStore(
    (state) => state.setUserConfiguration
  );

  useEffect(() => {
    loadAuthSchema().then((schema: FormAuthType) => setSchema(schema));
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormAuthValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormAuthValues> = async ({
    email,
    password,
  }) => {
    if (isLoading) return;
    setIsLoading(true);
    const message = await AuthUser(
      isRegistered,
      email,
      password,
      setUserConfiguration
    );
    setMessage(message);
    if (message.includes("successfully")) {
      showToast(message);
      navigate("/home/dashboard");
    } else {
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setIsLoading(false);
    }
  };

  return schema ? (
    <FormAuthUI
      isRegistered={isRegistered}
      isLoading={isLoading}
      isVisiblePassword={isVisiblePassword}
      togglePassword={() => setIsVisiblePassword((prev) => !prev)}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      switchAuth={() => {
        reset();
        setIsRegistered((prev) => !prev);
        setIsVisiblePassword(false);
        setMessage("");
      }}
      message={message}
    />
  ) : (
    <CircleLoader />
  );
};
