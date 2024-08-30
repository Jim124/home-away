import db from '../db';

export const createReviewAction = async () => {
  return { message: 'create review' };
};

export const fetchPropertyReviews = async () => {
  return { message: 'fetch reviews' };
};

export const fetchPropertyReviewsByUser = async () => {
  return { message: 'fetch user reviews' };
};

export const deleteReviewAction = async () => {
  return { message: 'delete review' };
};
