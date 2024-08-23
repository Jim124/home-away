import { LuUser2 } from 'react-icons/lu';

import { fetchProfileImage } from '@/utils/actions';
async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage)
    return (
      <img
        src={profileImage}
        alt='user avatar'
        className='h-6 w-6 rounded-full'
      />
    );
  return <LuUser2 className='w-6 h-6 rounded-full bg-primary' />;
}
export default UserIcon;
