'use server';
import db from '../db';
import { getAuthUser, renderError } from '../actions';
import { revalidatePath } from 'next/cache';
import { imageSchema, propertySchema, validateFieldSchema } from '../schemas';
import { uploadFileToFireBase } from '../helper/uploadImagToFirebase';

export const deleteRentalAction = async (prevState: { propertyId: string }) => {
  const { propertyId } = prevState;
  const user = await getAuthUser();
  try {
    await db.property.delete({ where: { id: propertyId, profileId: user.id } });
    revalidatePath('/rentals');
    return { message: 'Rental deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRentals = async () => {
  const user = await getAuthUser();
  const rentals = await db.property.findMany({
    where: { profileId: user.id },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
  const rentalsWithBookingsSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: {
          totalNights: true,
        },
      });
      const orderTotalSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: {
          orderTotal: true,
        },
      });
      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );
  return rentalsWithBookingsSums;
};

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser();
  return await db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  });
};

export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const propertyId = formData.get('id') as string;
  const rawData = Object.fromEntries(formData);
  const validateFields = validateFieldSchema(propertySchema, rawData);
  try {
    await db.property.update({
      where: { id: propertyId, profileId: user.id },
      data: {
        ...validateFields,
      },
    });
    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: 'update property successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updatePropertyImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const propertyId = formData.get('id') as string;
  try {
    const image = formData.get('image') as File;
    const validateFields = validateFieldSchema(imageSchema, { image });
    const fullPath = (await uploadFileToFireBase(
      validateFields.image
    )) as string;
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: 'update property image successfully' };
  } catch (error) {
    return renderError(error);
  }
};
