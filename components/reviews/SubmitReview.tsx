'use client';
import { useState } from 'react';
import { Card } from '../ui/card';
import RatingInput from '../form/RatingInput';
import TextAreaInput from '../form/TextAreaInput';
import SubmitButton from '../form/Buttons';
import { createReviewAction } from '@/utils/server-action/reviews';
import { Button } from '../ui/button';
import FormContainer from '../form/FormContainer';

function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isShowVisible, setIsShowVisible] = useState(false);
  return (
    <div className='mt-8'>
      <Button onClick={() => setIsShowVisible((prev) => !prev)}>
        Leave a Review
      </Button>
      {isShowVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='propertyId' value={propertyId} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              defaultValue='Amazing place !!!'
              labelText='Your Thoughts On This property'
            />
            <SubmitButton className='mt-4' text='Submit' />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
export default SubmitReview;
