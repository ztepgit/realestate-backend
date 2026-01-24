import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type SignupDto = z.infer<typeof SignupSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
