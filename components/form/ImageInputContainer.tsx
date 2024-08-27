'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import type { actionFunction } from '@/utils/types';
import ImageInput from './ImageInput';
import SubmitButton from './Buttons';
import { LuUser2 } from 'react-icons/lu';
import FormContainer from './FormContainer';

type ImageInputContainerProp = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProp) {
  const { image, name, action, text } = props;
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const userIcon = (
    <LuUser2 className='w-24 h-24 bg-primary rounded text-white' />
  );

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className='rounded object-cover mb-4 w-24 h-24'
        />
      ) : (
        userIcon
      )}
      <Button
        variant='outline'
        size='sm'
        onClick={() => setIsUpdateVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateVisible && (
        <div className='mt-4 max-w-lg'>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton text='submit' size='sm' />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
