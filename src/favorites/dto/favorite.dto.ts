import { z } from 'zod';

export const CreateFavoriteSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
  propertyId: z
    .number()
    .int()
    .positive('Property ID must be a positive integer'),
});

export const DeleteFavoriteSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
  propertyId: z
    .number()
    .int()
    .positive('Property ID must be a positive integer'),
});

export type CreateFavoriteDto = z.infer<typeof CreateFavoriteSchema>;
export type DeleteFavoriteDto = z.infer<typeof DeleteFavoriteSchema>;
