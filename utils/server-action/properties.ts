'use server';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import db from '../db';
import { redirect } from 'next/navigation';

import { getAuthUser, renderError } from '../actions';
import { propertySchema, validateFieldSchema } from '../schemas';

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = validateFieldSchema(propertySchema, rawData);

    return { message: 'Create property successfully' };
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};
