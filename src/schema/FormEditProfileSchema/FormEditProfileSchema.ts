import z from "zod";

export const FormEditProfileSchema = z.object({
  fullName: z.string().trim().min(1).max(50),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/),
  bio: z.string().trim().min(0).max(180),
  imageProfile: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file.type.startsWith("image/"),
        "El archivo debe ser una imagen"
      )
      .refine(
        (file) => file.size <= 2 * 1024 * 1024,
        "La imagen no debe pesar más de 2 MB"
      ),

    z.string().or(z.literal("")),
  ]),
});

export type FormEditProfileValues = z.infer<typeof FormEditProfileSchema>;
export type EditProfileType = typeof FormEditProfileSchema;
