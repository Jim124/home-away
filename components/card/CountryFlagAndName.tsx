import { findCountryByCode } from '@/utils/countries';

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validateCountry = findCountryByCode(countryCode)!;
  const countryName =
    validateCountry.name.length > 20
      ? validateCountry.name.substring(0, 20)
      : validateCountry.name;

  return (
    <span className='flex justify-between items-center gap-2 text-sm'>
      {validateCountry.flag} {countryName}
    </span>
  );
}
export default CountryFlagAndName;
