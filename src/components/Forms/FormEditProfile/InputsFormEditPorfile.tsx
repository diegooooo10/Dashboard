import type { Control, FieldErrors } from "react-hook-form";
import type { FormEditProfileValues } from "../../../schema";
import { InputEditProfile } from "./InputEditProfile";

type InputsFormEditPorfileProps = {
  errors: FieldErrors<FormEditProfileValues>;
  isModified: boolean;
  control: Control<FormEditProfileValues>;
};

export const InputsFormEditPorfile = ({
  errors,
  isModified,
  control,
}: InputsFormEditPorfileProps) => {
  return (
    <div className="grid lg:grid-cols-[calc(80%-20px)_calc(20%-20px)] gap-4">
      <InputEditProfile
        id="fullName"
        label="Full Name"
        placeholder="Full Name"
        isModified={isModified}
        className="col-span-full"
        error={errors.fullName}
        control={control}
        maxLength={50}
      />
      <InputEditProfile
        id="phoneNumber"
        label="Phone Number"
        placeholder="1234567890"
        className="col-span-full"
        isModified={isModified}
        error={errors.phoneNumber}
        control={control}
        maxLength={10}
      />
      <InputEditProfile
        id="bio"
        label="Bio"
        placeholder="Tell us about yourself"
        className="col-span-full"
        isModified={isModified}
        error={errors.bio}
        control={control}
        maxLength={180}
      />
    </div>
  );
};
