import { Label } from '../ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'country';

function SelectCountry({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-2'>
      <Label className='capitalize' htmlFor={name}>
        {name}
      </Label>
      <Select
        name={name}
        defaultValue={defaultValue || formattedCountries[0].code}
        required
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((country) => {
            return (
              <SelectItem key={country.code} value={country.code}>
                <span className='flex items-center gap-2'>
                  {country.flag} {country.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectCountry;
