'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

type SubmitButtonProps = {
  className?: string;
  text?: string;
};
function SubmitButton({ className = '', text = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      className={`capitalize ${className}`}
      size='lg'
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2  h-4 w-4 animate-spin ' /> Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
export default SubmitButton;
