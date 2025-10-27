import { z } from "zod";
import { PaymentMethods } from "../../constants";
import type { PaymentMethod } from "../../types";

export const FormCheckoutSchema = z.object({
  address: z.string().min(10, "Address is required"),
  paymentMethod: z
    .string()
    .min(1, "Payment method is required")
    .refine((val) => PaymentMethods.includes(val as PaymentMethod), {
      message: "Invalid payment method",
    }),
});

export type FormCheckoutValues = z.infer<typeof FormCheckoutSchema>;
export type FormCheckoutType = typeof FormCheckoutSchema;
