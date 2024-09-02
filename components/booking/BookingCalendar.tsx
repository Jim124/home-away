'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '../ui/calendar';
import { useToast } from '../ui/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
  const { toast } = useToast();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const current = new Date();
  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({ bookings, today: current });

  const unavailableDated = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedDate = generateDateRange(range);
    const isDisabledDatedIncluded = selectedDate.some((date) => {
      if (unavailableDated[date]) {
        setRange(defaultSelected);
        toast({ description: 'Some dates are booked, Please select again' });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range, toast, unavailableDated]);

  return (
    <Calendar
      mode='range'
      defaultMonth={current}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;
