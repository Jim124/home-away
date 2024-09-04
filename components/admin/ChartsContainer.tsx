import { fetchChars } from '@/utils/actions';
import Chart from './Chart';

async function ChartsContainer() {
  const charts = await fetchChars();
  if (charts.length === 0) return null;
  return <Chart data={charts} />;
}
export default ChartsContainer;
