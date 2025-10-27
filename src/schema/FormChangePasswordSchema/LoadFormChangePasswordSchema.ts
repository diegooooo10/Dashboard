export const loadChangePasswordSchema = async () => {
  const { FormChangePasswordSchema } = await import(
    "./FormChangePasswordSchema"
  );
  return FormChangePasswordSchema;
};
