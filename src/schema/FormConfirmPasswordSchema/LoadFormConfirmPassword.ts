export const loadConfirmPasswordSchema = async () => {
  const { FormConfirmPasswordSchema } = await import("./FormConfirmPassword");
  return FormConfirmPasswordSchema;
};
