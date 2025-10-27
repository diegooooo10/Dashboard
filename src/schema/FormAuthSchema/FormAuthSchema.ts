import { z } from "zod";

export const FormAuthSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .min(1, "Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});
export type FormAuthValues = z.infer<typeof FormAuthSchema>;
export type FormAuthType = typeof FormAuthSchema;
