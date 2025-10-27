import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useAuthStore } from "../../../store";
import { isImageFile, transformEncodeFile } from "../../../utils";
import { ImageProfile } from "../../Common";
import type { FormEditProfileValues } from "../../../schema";
import { showToast } from "../../ShowToast";
type ImageProfileUpdateProps = {
  errors: FieldErrors<FormEditProfileValues>;
  isModified: boolean;
  control: Control<FormEditProfileValues>;
  imageValue: string | File;
};

export const ImageProfileUpdate = ({
  isModified,
  control,
  errors,
  imageValue,
}: ImageProfileUpdateProps) => {
  const {
    userConfiguration: { fullName },
  } = useAuthStore();

  return (
    <div className="flex items-center gap-2 mb-4">
      <ImageProfile
        fullName={fullName}
        src={imageValue}
        className="w-20 h-20"
      />
      <div className="flex flex-col justify-cente gap-1">
        <span className="text-sm  font-semibold">Profile Picture</span>
        <Controller
          name="imageProfile"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="imageProfile"
                className={`border border-border dark:border-border-dark rounded-md text-text-secondary dark:text-text-secondary-dark text-xs text-center py-1 px-2 h-8 ${
                  isModified
                    ? "cursor-pointer  dark:bg-bg-card-dark bg-bg-card"
                    : "cursor-not-allowed bg-border dark:bg-border-dark"
                }`}
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="imageProfile"
                className="sr-only"
                onBlur={field.onBlur}
                ref={field.ref}
                disabled={!isModified}
                name={field.name}
                onChange={async (e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    try {
                      if (!isImageFile(file.name))
                        throw new Error("Invalid file");

                      const encoded = await transformEncodeFile(file);
                      field.onChange(encoded);
                    } catch (err) {
                      if (err instanceof Error) {
                        showToast(`Error reading image: ${err.message}`);
                      } else {
                        showToast(`Error reading image`);
                      }
                    }
                  }
                }}
              />
            </>
          )}
        />
        <span>{errors && errors.imageProfile?.message}</span>
      </div>
    </div>
  );
};
