export const loadProductSchema = async () => {
  const { FormProductSchema } = await import("./FormProductSchema");
  return FormProductSchema;
};
