import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/server-action/properties';

import SubmitButton from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import SelectCategory from '@/components/form/SelectCategory';
import TextAreaInput from '@/components/form/TextAreaInput';
import SelectCountry from '@/components/form/SelectCountry';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

function CreatePropertyPage() {
  return (
    <section>
      <ScrollArea>
        <h1 className='text-2xl font-semibold mb-8 capitalize'>
          create property
        </h1>
        <div className='border p-8 rounded-md'>
          <h3 className='text-lg mb-4 font-medium'>General Info</h3>
          <FormContainer action={createPropertyAction}>
            <div className='grid md:grid-cols-2  gap-8 mb-4'>
              <FormInput
                name='name'
                type='text'
                label='Name (20 limit)'
                defaultValue='Cabin in China'
              />
              <FormInput
                name='tagline'
                type='text'
                label='Tagline (30 limit)'
                defaultValue='Dream Getaway Awaits You Here'
              />
              {/* price */}
              <PriceInput />
              {/* categories */}
              <SelectCategory />
            </div>
            {/* text area /description */}
            <TextAreaInput
              name='description'
              labelText='Description (10 - 1000 words)'
            />
            <div className='grid md:grid-cols-2 gap-8 mt-4'>
              <SelectCountry />
              <ImageInput />
            </div>
            <h3 className='text-lg mt-8 mb-4 font-medium'>
              Accommodation Details
            </h3>
            <CounterInput detail='guests' />
            <CounterInput detail='bedrooms' />
            <CounterInput detail='beds' />
            <CounterInput detail='baths' />
            <h3 className='text-lg mt-10 mb-6 font-medium'> Amenities</h3>
            <AmenitiesInput />
            <SubmitButton className='mt-12' text='create rental' />
          </FormContainer>
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </section>
  );
}
export default CreatePropertyPage;
