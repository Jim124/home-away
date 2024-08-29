'use server';
import { getAuthUser, renderError } from '../actions';
import db from '../db';
import { revalidatePath } from 'next/cache';

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    select: { id: true },
    where: { propertyId, profileId: user.id },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}): Promise<{ message: string }> => {
  const { propertyId, favoriteId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Faves' : 'Added to Faves' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    select: {
      property: {
        select: {
          id: true,
          name: true,
          image: true,
          tagline: true,
          price: true,
          country: true,
        },
      },
    },
    where: { profileId: user.id },
  });
  return favorites.map((favorite) => favorite.property);
};
