import FormInput from '@/components/form/FormInput';
import SubmitBotton from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createUserProfile } from '@/utils/actions';

function CreateProfilePage() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
      <div className='border p-8 rounded-md '>
        <FormContainer action={createUserProfile}>
          <div className='grid md:grid-cols-2 mt-4 gap-4'>
            <FormInput name='firstName' type='text' label='first name' />
            <FormInput name='lastName' type='text' label='Last Name' />
            <FormInput name='username' type='text' label='username' />
          </div>
          <SubmitBotton text='Create a new user' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfilePage;
