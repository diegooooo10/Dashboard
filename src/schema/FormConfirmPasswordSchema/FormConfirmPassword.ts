import { z } from "zod";
const password = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/\d/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const FormConfirmPasswordSchema = z.object({
  confirmPassword: password,
});
export type FormConfirmPasswordValues = z.infer<
  typeof FormConfirmPasswordSchema
>;
export type FormConfirmPasswordType = typeof FormConfirmPasswordSchema;
