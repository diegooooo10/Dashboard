export const loadAuthSchema = async () => {
  const { FormAuthSchema } = await import("./FormAuthSchema");
  return FormAuthSchema;
};
