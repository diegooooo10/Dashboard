import { z } from "zod";
const password = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/\d/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const FormChangePasswordSchema = z.object({
  currentPassword: password,
  newPassword: password,
});
export type FormChangePasswordValues = z.infer<typeof FormChangePasswordSchema>;
export type FormChangePasswordType = typeof FormChangePasswordSchema;
