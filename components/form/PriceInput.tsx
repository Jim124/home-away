import { Prisma } from '@prisma/client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';

const name = Prisma.PropertyScalarFieldEnum.price;

type PriceInputProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name}>Price ($)</Label>
      <Input
        type='number'
        min={2}
        defaultValue={defaultValue || 100}
        id={name}
        name={name}
        required
      />
    </div>
  );
}
export default PriceInput;
