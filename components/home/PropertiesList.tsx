import type { PropertyCardProps } from '@/utils/types';
import PropertyCard from '../card/PropertyCard';

type PropertiesListProps = {
  properties: PropertyCardProps[];
};

function PropertiesList({ properties }: PropertiesListProps) {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}
export default PropertiesList;
