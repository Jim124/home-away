'use client';

import { useProperty } from '@/utils/store';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import SubmitButton from '../form/Buttons';
import { createBookingAction } from '@/utils/server-action/bookings';
import FormContainer from '../form/FormContainer';

function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  if (!userId)
    return (
      <SignInButton mode='modal'>
        <Button className='w-full' type='button'>
          Sign In To Completing booking
        </Button>
      </SignInButton>
    );
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });
  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmBooking;
