'use server';
import db from '../db';
import { getAuthUser } from '../actions';

export const fetchReservations = async () => {
  const user = await getAuthUser();
  const reservations = await db.booking.findMany({
    where: {
      property: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return reservations;
};
