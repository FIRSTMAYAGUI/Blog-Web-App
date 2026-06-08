import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(25, "Name must be at most 25 characters"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
});