import Link from 'next/link';

import { fetchReservations } from '@/utils/server-action/reservations';

import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from '@/components/ui/table';

import { formatDate, formatCurrency } from '@/utils/format';
import Stats from '@/components/reservations/Stats';

async function ReservationPage() {
  const reservations = await fetchReservations();
  if (reservations.length === 0) return <EmptyList />;
  return (
    <>
      <Stats />
      <section className='mt-16'>
        <h4 className='mb-4 capitalize'>
          total reservations:{reservations.length}
        </h4>
        <Table>
          <TableCaption>A list of recent reservations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => {
              const { id, totalNights, orderTotal, checkIn, checkOut } = item;
              const { id: propertyId, country, name } = item.property;
              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className='underline text-muted-foreground tracking-wide'
                      scroll={true}
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
export default ReservationPage;
