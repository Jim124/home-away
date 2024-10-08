'use server';
import db from '../db';
import { redirect } from 'next/navigation';

import { getAuthUser, renderError } from '../actions';
import { imageSchema, propertySchema, validateFieldSchema } from '../schemas';
import { uploadFileToFireBase } from '../helper/uploadImagToFirebase';
import { actionFunction } from '../types';
import { revalidatePath } from 'next/cache';

export const createPropertyAction: actionFunction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const file = formData.get('image') as File;
    const rawData = Object.fromEntries(formData);
    const validateFields = validateFieldSchema(propertySchema, rawData);
    const validateFile = validateFieldSchema(imageSchema, { image: file });
    const fullPath = (await uploadFileToFireBase(validateFile.image)) as string;
    await db.property.create({
      data: {
        ...validateFields,
        image: fullPath,
        profileId: user.id,
      },
    });
    revalidatePath('/rentals');
    revalidatePath('/');
    //return { message: 'Create property successfully' };
  } catch (error) {
    return renderError(error);
  }
  redirect('/rentals');
};

export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      tagline: true,
      price: true,
      country: true,
    },
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return properties;
};

export const fetchPropertyById = async (id: string) => {
  return await db.property.findUnique({
    where: { id },
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export const createProperty = async (formData: FormData) => {
  const user = await getAuthUser();
  try {
    const file = formData.get('image') as File;
    const rawData = Object.fromEntries(formData);
    const validateFields = validateFieldSchema(propertySchema, rawData);
    const validateFile = validateFieldSchema(imageSchema, { image: file });
    const fullPath = (await uploadFileToFireBase(validateFile.image)) as string;
    await db.property.create({
      data: {
        ...validateFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};
