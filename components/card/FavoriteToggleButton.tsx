import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';

function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  return (
    <Button className='p-2 cursor-pointer' variant='outline' size='icon'>
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
