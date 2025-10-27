export const LoadFormCheckoutSchema = async () => {
  const { FormCheckoutSchema } = await import("./FormCheckoutSchema");
  return FormCheckoutSchema;
};
