'use server';
import db from '../db';
import { getAuthUser, renderError } from '../actions';
import { calculateTotals } from '../calculateTotals';
import { redirect } from 'next/navigation';

export const createBookingAction = async (
  prevState: { propertyId: string; checkIn: Date; checkOut: Date },
  formData: FormData
) => {
  const user = await getAuthUser();
  const { propertyId, checkIn, checkOut } = prevState;
  const property = await db.property.findUnique({
    select: {
      price: true,
    },
    where: { id: propertyId },
  });
  if (!property) return { message: 'Property not found' };
  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });
  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        totalNights,
        orderTotal,
        propertyId,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/bookings');
};
