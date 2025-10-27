import { useEffect, useState } from "react";
import {
  loadEditProfileSchema,
  type EditProfileType,
  type FormEditProfileValues,
} from "../../../schema";
import { FormEditProfileUI } from "./FormEditProfileUI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../../../store";
import { updateProfileData } from "../../../services";
import { showToast } from "../../ShowToast";

export const FormEditProfile = () => {
  const userConfiguration = useAuthStore((state) => state.userConfiguration);
  const setUserConfiguration = useAuthStore(
    (state) => state.setUserConfiguration
  );
  const [schema, setSchema] = useState<EditProfileType | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    loadEditProfileSchema().then((schema: EditProfileType) =>
      setSchema(schema)
    );
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormEditProfileValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",

    defaultValues: {
      bio: userConfiguration.bio,
      fullName: userConfiguration.fullName,
      phoneNumber: userConfiguration.phoneNumber,
      imageProfile: userConfiguration.imageProfile,
    },
  });
  const isEqualValues = (values: {
    fullName: string;
    phoneNumber: string;
    bio: string;
    imageProfile: string | File;
  }): boolean => {
    return (
      values.fullName === userConfiguration.fullName &&
      values.bio === userConfiguration.bio &&
      values.imageProfile === userConfiguration.imageProfile &&
      values.phoneNumber === userConfiguration.phoneNumber
    );
  };
  const onsubmit: SubmitHandler<FormEditProfileValues> = async (values) => {
    if (!user?.email) return;
    const isEqual = isEqualValues(values);
    if (isEqual) {
      showToast("No changes detected. Profile not updated.");
      setIsModified(false);
      return;
    }
    setUserConfiguration({
      ...values,
      email: userConfiguration.email,
      rol: userConfiguration.rol,
    });
    const message = await updateProfileData(user.uid, values);
    showToast(message);
    setIsModified(false);
  };
  const imageValue = watch("imageProfile");
  return (
    <FormEditProfileUI
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onsubmit}
      reset={reset}
      imageValue={imageValue}
      isModified={isModified}
      setIsModified={setIsModified}
    />
  );
};
