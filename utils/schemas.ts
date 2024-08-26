import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'firstName must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'lastName must be at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'username must be at least 2 characters' }),
});

export function validateFieldSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
