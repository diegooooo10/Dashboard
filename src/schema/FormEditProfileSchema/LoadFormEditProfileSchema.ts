export const loadEditProfileSchema = async () => {
  const { FormEditProfileSchema } = await import("./FormEditProfileSchema");
  return FormEditProfileSchema;
};
