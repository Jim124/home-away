import { Skeleton } from '../ui/skeleton';

function LoadingTable({ rows }: { rows?: number }) {
  const tablesRows = Array.from({ length: rows || 5 }, (_, index) => {
    return (
      <div className='mb-4' key={index}>
        <Skeleton className='w-full h-8 rounded' />
      </div>
    );
  });
  return <>{tablesRows}</>;
}
export default LoadingTable;
