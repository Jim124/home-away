import Link from 'next/link';
import { Button } from '../ui/button';

function EmptyList({
  heading = 'No items in the list',
  message = 'Keeping exploring our properties',
  btnText = 'back to home',
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className='mt-5'>
      <h2 className='text-xl font-bold'>{heading}</h2>
      <p className='text-lg'>{message}</p>
      <Button asChild size='lg' className='capitalize mt-4'>
        <Link href='/'> {btnText}</Link>
      </Button>
    </div>
  );
}
export default EmptyList;
