import { z } from "zod";
import { categories } from "../../constants";
import type { Category } from "../../types";

const number = z
  .string()
  .trim()
  .regex(/^-?\d+(\.\d+)?$/, "Must be a valid number")
  .regex(/^\d+(\.\d+)?$/, "Must be non-negative");

export const FormProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(80, "Title must be at most 80 characters"),

  thumbnail: z.string().trim().min(1, "Thumbnail must be a valid URL"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(180, "Description must be at most 180 characters"),
  category: z
    .string()
    .min(1, "Please select a category")
    .refine((category) => categories.includes(category as Category), {
      message: "Please select a valid category from the list.",
    }),

  price: number.refine((val) => parseFloat(val) <= 999999999, {
    message: "Numbers greater than 999,999,999 are not allowed",
  }),

  stock: number
    .regex(/^\d+$/, "Stock must be a whole number")
    .refine((val) => parseFloat(val) <= 1000, {
      message: "The maximum stock allowed is 1000 ",
    }),
});

export type FormProductValues = z.infer<typeof FormProductSchema>;
export type FormProductType = typeof FormProductSchema;
