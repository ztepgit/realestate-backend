import { z } from 'zod';
export declare const CreateFavoriteSchema: z.ZodObject<{
    userId: z.ZodNumber;
    propertyId: z.ZodNumber;
}, z.core.$strip>;
export declare const DeleteFavoriteSchema: z.ZodObject<{
    userId: z.ZodNumber;
    propertyId: z.ZodNumber;
}, z.core.$strip>;
export type CreateFavoriteDto = z.infer<typeof CreateFavoriteSchema>;
export type DeleteFavoriteDto = z.infer<typeof DeleteFavoriteSchema>;
