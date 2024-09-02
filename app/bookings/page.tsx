import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import { formatDate, formatCurrency } from '@/utils/format';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  TableRow,
} from '@/components/ui/table';

import { IconButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import {
  deleteBookingAction,
  fetchBookings,
} from '@/utils/server-action/bookings';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';

async function BookingsPage() {
  const bookings = await fetchBookings();
  if (bookings.length === 0) return <EmptyList />;

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>total bookings: {bookings.length}</h4>
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>PropertyName</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>CheckIn</TableHead>
            <TableHead>CheckOut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = booking;
            const { id: propertyId, name, country } = booking.property;
            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    className='underline text-muted-foreground tracking-wide'
                    href={`/properties/${propertyId}`}
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagAndName countryCode={country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                <TableCell>{formatDate(checkIn)}</TableCell>
                <TableCell>{formatDate(checkOut)}</TableCell>
                <TableCell>
                  <DeleteBooking bookingId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default BookingsPage;

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId });
  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}
