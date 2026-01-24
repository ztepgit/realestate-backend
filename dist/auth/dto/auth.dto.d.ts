import { z } from 'zod';
export declare const SignupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupDto = z.infer<typeof SignupSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
