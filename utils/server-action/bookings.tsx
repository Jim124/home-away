'use server';
import db from '../db';
import { getAuthUser, renderError } from '../actions';
import { calculateTotals } from '../calculateTotals';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
  let bookingId: string | null = null;
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
    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  return await db.booking.findMany({
    where: { profileId: user.id },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const deleteBookingAction = async (prevState: { bookingId: string }) => {
  const user = await getAuthUser();
  const { bookingId } = prevState;
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });
    revalidatePath('/bookings');
    return { message: 'Booking deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};
