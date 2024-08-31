'use server';

import { revalidatePath } from 'next/cache';
import { getAuthUser, renderError } from '../actions';
import db from '../db';
import { reviewSchema, validateFieldSchema } from '../schemas';

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = validateFieldSchema(reviewSchema, rawData);
    const review = await db.review.create({
      data: {
        ...validateFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/properties/${review.propertyId}`);
    return { message: 'Review submitted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    where: {
      propertyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
};

export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    where: {
      profileId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  try {
    await db.review.delete({ where: { id: reviewId } });
    revalidatePath('/reviews');
    return { message: 'deleted review successfully' };
  } catch (error) {
    return renderError(error);
  }
};
