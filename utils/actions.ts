'use server';

import { profileSchema } from './schemas';
import { actionFunction } from './types';

export const createUserProfile: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const result = profileSchema.parse(rawData);
    console.log(result);
    return { message: 'hello' };
  } catch (error) {
    return { message: 'there was an error' };
  }
};
