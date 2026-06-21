import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be at most 100 characters"),
  content: z.string().min(20, "Content must be at least 20 characters").max(5000, "Content must be at most 5000 characters"),
  /* image: z
    .instanceof(File, { message: "Please select an image" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be smaller than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Image must be a JPEG, PNG, or WebP file"
    ), */
});

export type PostFormValues = z.infer<typeof postSchema>;