import z  from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2).max(25),
  email: z.email(),
  password: z.string().min(6).max(20),
});