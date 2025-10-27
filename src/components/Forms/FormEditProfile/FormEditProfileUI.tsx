import type { Dispatch, SetStateAction } from "react";
import type { FormEditProfileValues } from "../../../schema";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from "react-hook-form";
import { ActionsFormEditProfile } from "./ActionsFormEditProfile";
import { ImageProfileUpdate } from "./ImageProfileUpdate";
import { InputsFormEditPorfile } from "./InputsFormEditPorfile";

type FormEditProfileUIProps = {
  control: Control<FormEditProfileValues>;
  errors: FieldErrors<FormEditProfileValues>;
  handleSubmit: UseFormHandleSubmit<FormEditProfileValues>;
  onSubmit: SubmitHandler<FormEditProfileValues>;
  reset: UseFormReset<FormEditProfileValues>;
  imageValue: string | File;
  isModified: boolean;
  setIsModified: Dispatch<SetStateAction<boolean>>;
};

export const FormEditProfileUI = ({
  control,
  errors,
  onSubmit,
  handleSubmit,
  reset,
  imageValue,
  isModified,
  setIsModified,
}: FormEditProfileUIProps) => {
  return (
    <form
      className="card p-5"
      aria-label="Personal Information"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Personal Information</h3>
          <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
            Update your profile details
          </p>
        </div>
        <ActionsFormEditProfile
          isModified={isModified}
          setIsModified={setIsModified}
          reset={reset}
        />
      </header>

      <ImageProfileUpdate
        isModified={isModified}
        control={control}
        errors={errors}
        imageValue={imageValue}
      />
      <hr className="border-divider dark:border-divider-dark my-4" />

      <InputsFormEditPorfile
        control={control}
        errors={errors}
        isModified={isModified}
      />
    </form>
  );
};
