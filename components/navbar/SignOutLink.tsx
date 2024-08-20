'use client';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '../ui/use-toast';
function SignOutLink() {
  const { toast } = useToast();
  function handleSignOut() {
    toast({ description: 'You have been signed out' });
  }
  return (
    <SignOutButton redirectUrl='/'>
      <button
        type='button'
        className='w-full text-left'
        onClick={handleSignOut}
      >
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
