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

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024 * 3;
  const acceptedFilesTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return (
        !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}
