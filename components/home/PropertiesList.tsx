import type { PropertyCardProps } from '@/utils/types';
import PropertyCard from '../card/PropertyCard';

type PropertiesListProps = {
  properties: PropertyCardProps[];
};

function PropertiesList({ properties }: PropertiesListProps) {
  return (
    <section>
      {properties.map((property) => {
        return <PropertyCard key={property.id} />;
      })}
    </section>
  );
}
export default PropertiesList;
