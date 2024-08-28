import { PropertyCardProps } from '@/utils/types';
import PropertiesList from './PropertiesList';
import { fetchProperties } from '@/utils/server-action/properties';
import EmptyList from './EmptyList';

async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const properties: PropertyCardProps[] = await fetchProperties({
    search,
    category,
  });
  if (properties.length === 0)
    return (
      <EmptyList
        heading='No results'
        message='Try changing or removing some of your filters.'
        btnText='Clear filters'
      />
    );
  return <PropertiesList properties={properties} />;
}
export default PropertiesContainer;
