import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

const bucketName = 'temp-home-away';

export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  const imageName = `${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(imageName, image, { cacheControl: '3600' });
  if (error) {
    console.log(error);
    throw new Error('Failed to upload image');
  }
  return supabase.storage.from(bucketName).getPublicUrl(imageName).data
    .publicUrl;
};
